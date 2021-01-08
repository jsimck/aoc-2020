export default class Password {
  static RE = /(\d+)-(\d+) (\w)+: (\w+)/i;

  min = 0;
  max = 0;
  key = '';
  password = '';

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

  private inRange(val: number): boolean {
    return val >= this.min && val <= this.max;
  }

  parse(
    line: string
  ): { min: number; max: number; key: string; password: string } | null {
    const parsedPassword = Password.RE.exec(line);

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

  isReallyValid(): boolean {
    const isFirstPosValid = this.password[this.min - 1] === this.key;
    const isSecondPosValid = this.password[this.max - 1] === this.key;

    return (
      (isFirstPosValid && !isSecondPosValid) ||
      (!isFirstPosValid && isSecondPosValid)
    );
  }

  toString(): string {
    return `${this.min}-${this.max} ${this.key}:${
      this.password
    }, valid: ${this.isValid()}, reallyValid ${this.isReallyValid()}`;
  }
}
