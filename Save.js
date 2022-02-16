/* Полезный для отладки скриптик, написал iKPYT 15.02.2022, подставляет номер 
   строки в которой встретит шаблон __2__ где 2 или любое целое число будет 
   заменён на номер строки в которой этот шаблон встретился.
   Это полезно использовать в отладочной печати, наряду с указанием имени файла

   Чтобы автоматизировать это действие в VScode создайте файл task.json c текстом
   в подпапке .vscode 
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
    Сам файл положил в `E:\PCAD\Nobilis\ionic\` это корень моих проектов на ionic.
    Настройки задач положил в `E:\PCAD\Nobilis\ua-911btc\.vscode\task.json` это папка 
    одного из моих проектов.
    Настройки сочитания клавишь для запуска положил в 
    `C:\с рабочего стола\My Util\VisualStudioCodePM\VSCode-win32-x64-1.60.2.ionic\data\user-data\User\keybindings.json`, 
    я пользуюсь PM версией VSCode.

    #### Если используете файл .code-workspace
    У меня много папок проектов которые перечислены в `Ionic.code-workspace` и мне не удобно 
    создавать в каждой папке проекта подпапку .vscode\task.json. Для workspace можно создать 
    раздел task и записать туда всё что в файле .vscode\task.json, что я и сделал. 
    И это работает для всех моих проектов из этого рабочего пространства.

    добавил ограничение по разширениям файлов и перевесил на "ctrl+s"

*/
const { argv } = require("process");
const fs  = require("fs");
const path  = require("path");

//console.log("__66__");

// обрабатываем только файлы программ с разширениями 
const extname = [".js",".ts"] // добавить при реобходимости
let ext = path.extname(argv[2]);

if( extname.includes(ext) == false ) {
    console.log(ext)
    return;
}


fs.readFile(argv[2], function(err, data) {
    if(err) throw err;
    // делю файл на строки
    let резделитель ="\r\n";
    let array = data.toString().split(резделитель);
    // определяю разделитель в файле
    if(array.length == 1){
        резделитель ="\r";
        array = data.toString().split(резделитель);
        if(array.length == 1){
            резделитель ="\n";
            array = data.toString().split(резделитель);
            if(array.length == 1){
                резделитель ="";
                array = data.toString().split(резделитель);
            }
        }
    }

    for(i in array) {
        var n = i;
        ++n;
        let str = array[i].replace(/__\d+__/gi,`__${n}__`);
        array[i] = str;
        //console.log(n,array[i]); 
    }
    
    //console.log("__105__");
    let dota = array.join(резделитель);  // соберём файл из строк
    // запишем во временный файл
    fs.writeFile(argv[2]+".__line__",dota,(err)=>{
        if (err) throw err;
        //console.log('The file has been saved!');
        // переименуем исходный файл в старый
        fs.rename(argv[2],argv[2]+".old",(err)=>{
            if (err) throw err;
            // переименуем временный файл в наш файл
            fs.rename(argv[2]+".__line__",argv[2],(err)=>{
                if (err) throw err;
                console.log(`__${n}__`);
            })
        })
    })
});
