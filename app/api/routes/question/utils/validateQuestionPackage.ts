export const validateQuestionPackage = (questionPackageName:string) => {
    if (!questionPackageName || questionPackageName.trim() === "") {
        throw new Error("Bad request: question package is required")
    }

    validatePackageName(questionPackageName)
}

export const validatePackageName = (planName: string) => {
    const regex = /^([a-z0-9]+_){2,}[a-z0-9]+$/;
    const test = regex.test(planName)
    if(!test) {
        throw new Error("Package name must be formatted like category_package_packageNumber in lowercase (ex. twk_package_1), space must replaced by underscore '_'")
    }
}