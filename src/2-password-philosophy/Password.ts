const PASSWORD_RE = /(\d+)-(\d+) (\w)+: (\w+)/i;

export default class Password {
  min: number = 0;
  max: number = 0;
  key: string = '';
  password: string = '';

  constructor(line?: string) {
    if (!line) {
      return;
    }

    const parsedPassword = this.parse(line);

    if (!parsedPassword) {
      return;
    }

    this.min = parsedPassword.min;
    this.max = parsedPassword.max;
    this.key = parsedPassword.key;
    this.password = parsedPassword.password;
  }

  parse(
    line: string
  ): { min: number; max: number; key: string; password: string } | null {
    const parsedPassword = PASSWORD_RE.exec(line);

    if (parsedPassword) {
      // eslint-disable-next-line no-unused-vars
      const [_, min, max, key, password] = parsedPassword;

      return {
        min: parseInt(min),
        max: parseInt(max),
        key,
        password,
      };
    }

    return null;
  }

  isValid(): boolean {
    return this.inRange(
      this.password.split('').reduce((acc, cur) => {
        if (cur === this.key) {
          acc++;
        }

        return acc;
      }, 0)
    );
  }

  private inRange(val: number): boolean {
    return val >= this.min && val <= this.max;
  }
}
