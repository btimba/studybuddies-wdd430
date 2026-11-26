"use server";

import { createGroupSchema } from "@/lib/validations/group";

export type CreateGroupState = {
    errors?: {
        name?: string;
        subject?: string;
        description?: string;
    };
    message?: string;
    values?: {
        name?: string;
        subject?: string;
        description?: string;
    };
};

export async function createGroup(
    _prevState: CreateGroupState,
    formData: FormData
): Promise<CreateGroupState> {
    const name = formData.get("name")?.toString() ?? "";
    const subject = formData.get("subject")?.toString() ?? "";
    const description = formData.get("description")?.toString() ?? "";

    const errors = validateFields(name, subject, description);
    if (errors) {
        return {
            errors: {
                name: errors.fieldErrors.name?.[0],
                subject: errors.fieldErrors.subject?.[0],
                description: errors.fieldErrors.description?.[0],
            },
            message: "Please correct the errors highlighted.",
            values: { name, subject, description },
        };
    }

    return {};
}

const validateFields = (name: string, subject: string, description: string) => {
    const result = createGroupSchema.safeParse({ name, subject, description });
    return result.success ? null : result.error.flatten();
};