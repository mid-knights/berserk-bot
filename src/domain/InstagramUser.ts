import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { InstagramUserUsername } from "./InstagramUserUsername";
import { InstagramUserLink } from "./InstagramUserLink";

interface InstagramUserProps {
  username: InstagramUserUsername;
  link: InstagramUserLink;
  avatarURL: string;
}

export class InstagramUser extends ValueObject<InstagramUserProps> {
  private constructor(props: InstagramUserProps) {
    super(props);
  }

  get username(): InstagramUserUsername {
    return this.props.username;
  }

  get link(): InstagramUserLink {
    return this.props.link;
  }

  get avatarURL(): string {
    return this.props.avatarURL;
  }

  public static create(props: InstagramUserProps): Result<InstagramUser> {
    const user = new InstagramUser({
      ...props,
    });

    return Result.ok<InstagramUser>(user);
  }
}
