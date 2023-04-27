import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatus = [
        TaskStatus.DONE,
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS
    ]

    transform(value: any, metadata: ArgumentMetadata) {

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is not a valid status`);
        }

        return value;

    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatus.indexOf(status);
        return idx !== -1;

    }

}