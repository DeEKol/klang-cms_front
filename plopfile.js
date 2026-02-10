export default function (plop) {
    plop.setGenerator("slice", {
        description: "Create a React Slice",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Slice name:",
            },
            {
                type: "list",
                name: "layer",
                choices: [
                    "app",
                    "pages",
                    "widgets",
                    "features",
                    "entities",
                    "shared/ui/atoms",
                    "shared/ui/molecules",
                    "shared/ui/organisms",
                ],
            },
        ], // * Вопросы
        actions: [
            {
                type: "add", // добавить файл
                path: "src/{{layer}}/{{name}}/{{name}}.tsx",
                templateFile: "templates/component.hbs",
            },
            {
                type: "add", // еще один файл
                path: "src/{{layer}}/{{name}}/{{name}}.module.css",
                templateFile: "templates/styles.hbs",
            },
            {
                type: "add", // еще один файл
                path: "src/{{layer}}/{{name}}/index.ts",
                templateFile: "templates/index.hbs",
            },
        ], // * Действия
    });
}
