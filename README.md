
## Полезный для отладки скриптик
#### написал iKPYT 15.02.2022
подставляет номер строки в которой встретит шаблон __2__ где 2 или любое целое число будет заменён на номер строки в которой этот шаблон встретился.
Это полезно использовать в отладочной печати, наряду с указанием имени файла
Чтобы автоматизировать это действие в VScode создайте файл task.json c текстом в подпапке .vscode 
```
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    // https://code.visualstudio.com/docs/editor/tasks
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Обработать __Line__",
            "type": "shell",
            "command": "node",
            "args": [
                "${workspaceFolder}/../Save.js", // укажи где лежит мой файл 
                "${file}"
            ],
            "problemMatcher": [],
            "presentation": {
                "echo": false,
                "reveal": "never",
                "revealProblems":"onProblem",
                "focus": false,
                "panel": "shared",
                "showReuseMessage": false,
                "clear": true
            }
        }
    ]
}
и привяжите эту задачу к кнопке, например к alt+s, 
как показано ниже в файле keybindings.json
[
    {
        "key": "alt+s",
        //"key": "ctrl+s",
        "command": "workbench.action.tasks.runTask",
        "args": "Обработать __Line__",
        "when": "activeEditor"
    }
]
```
Сам файл положил в `E:\PCAD\Nobilis\ionic\`
настройки в `E:\PCAD\Nobilis\ua-911btc\.vscode\task.json`
и в `C:\с рабочего стола\My Util\VisualStudioCodePM\VSCode-win32-x64-1.60.2.onic\data\user-data\User\keybindings.json`

#### Если используете файл .code-workspace
У меня много папок проектов которые перечислены в `Ionic.code-workspace` и мне не добно создавать в каждой папке проекта подпапку .vscode\task.json. Для workspace можно оздать раздел task и записать туда всё что в файле .vscode\task.json, что я и сделал. И это работает для всех моих проектов из этого рабочего пространства.

- добавил ограничение по разширениям и повесил на "ctrl+s"
*/