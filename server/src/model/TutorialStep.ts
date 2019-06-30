/**
 * Represents a tutorial step.
 */
export class TutorialStep {

    /**
     * @param heading The heading of the step.
     * @param body The description of the step.
     */
    constructor(
        readonly heading: string,
        readonly body: string){ };
}