import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicantDto } from './create-applicant.dto';

export class UpdateApplicantDto extends PartialType(CreateApplicantDto) {
    birthdate?: Date;
    residenceAdress?: string;
    residenceCity?: string;
    residenceProvince?: string;
    zip?: number;
    programmeChoose?: string;
    spainPermission?: string;
    colectiveGroup?: string;
    educationLevel?: string;
    higherEducationTitle?: string;
    professionalSituation?: string;
    weeklyCommitment?: string;
    internetAccess?: string;
    eLearning?: boolean;
    reasons?: string;
    programmeFound?: string;
    extraInformation?: string;
}

