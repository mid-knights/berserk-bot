import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface InstagramUserLinkProps {
  value: string;
}

export class InstagramUserLink extends ValueObject<
  InstagramUserLinkProps
> {
  private constructor(props: InstagramUserLinkProps) {
    super(props);
  }

  get url(): string {
    return this.props.value;
  }

  public static create(
    props: InstagramUserLinkProps
  ): Result<InstagramUserLink> {
    const url = Guard.againstNullOrUndefined(
      props.value,
      "link"
    );

    if (!url.succeeded) {
      return Result.fail<InstagramUserLink>(url.message);
    } else {
      return Result.ok<InstagramUserLink>(new InstagramUserLink({ ...props }));
    }
  }
}
