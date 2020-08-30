import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface InstagramUserUsernameProps {
  value: string;
}

export class InstagramUserUsername extends ValueObject<InstagramUserUsernameProps> {
  private constructor(props: InstagramUserUsernameProps) {
    super(props);
  }

  get username(): string {
    return this.props.value;
  }

  private static validateUsername(username: string): boolean {
    return /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm.test(username)
  }

  public static create(props: InstagramUserUsernameProps): Result<InstagramUserUsername> {
    const usernameResult = Guard.againstNullOrUndefined(props.value, 'username');

    if (!usernameResult.succeeded) {
      return Result.fail<InstagramUserUsername>(usernameResult.message);
    } else if (!this.validateUsername(props.value)) {
      return Result.fail<InstagramUserUsername>(
        "El nombre del usuario debe ser alfanumérico"
      );
    } else {
      return Result.ok<InstagramUserUsername>(
        new InstagramUserUsername({ ...props })
      );
    }
  }
}
