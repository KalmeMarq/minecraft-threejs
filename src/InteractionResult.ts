export default class InteractionResult {
  public static SUCCESS = new InteractionResult()
  public static FAIL = new InteractionResult()

  private constructor() {
  }

  public consumesAction(): boolean {
    return this === InteractionResult.SUCCESS
  }
}