"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
const vscode = __importStar(require("vscode"));
// {a} и {b} — подставляются из выделенных переменных
const jokes = [
    // ковбои: {a} = Джо, {b} = Билл
    `Два ковбоя скачут по прерии. Один другому говорит:\n- {a}, держу пари на сто долларов, что ты мое говно не съешь.\n- Съем, - отвечает тот.\nПоспорили. {a} съел, {b} пришлось выложить сто долларов.\nСкачут дальше. {a} стало обидно за себя, он и говорит:\n- {b}, держу пари на сто долларов, что ты мое говно не съешь.\n- Съем.\nПоспорили. {b} съел, {a} выложил сто долларов.\nСкачут дальше. Вдруг {b} говорит:\n- {a}, сдается мне, что мы с тобой говна бесплатно наелись.`,
    // {a} = хозяин, {b} = мастер
    `Приходит {a} вечером с работы, хочет постирать вещи, а стиральная машина сломалась. Вызывает {b} на дом.\nПриезжает {b}, подходит к машинке, внимательно её осматривает, а потом как бахнет по ней кулаком со всей дури! Стиралка сразу зашумела, заработала — починилась.\n{a} в шоке: «Ого, спасибо! Сколько с меня?»\n{b} не унимается, сурово смотрит на него и говорит:\n— {a}, принеси мне молоток и пару гвоздей.\n— Э-э-э... ну ладно, сейчас.\n{a} приносит. {b} берёт молоток, приставляет гвоздь прямо к новенькому пластиковому корпусу стиральной машины и со свистом забивает его туда по самую шляпку. Потом второй гвоздь рядом — бах-бах!\n{a} бледнеет, хватается за голову и орёт:\n— Ты что творишь, придурок?! Зачем ты гвозди в стиралку забил?! Она же работала!!!\n{b} поворачивается, вытирает пот со лба и говорит:\n— Да я просто гвозди забивать люблю пиздец! Забивал бы 24 часа в сутки, просто из рук бы молоток не выпускал! Забивать люблю аж трясет, жить без этого не могу!`,
    // {a} = улитка, {b} = бармен
    `Приходит {a} в бар, а {b} ей отвечает:\n- Мы {a} не обслуживаем!\nИ выкинул её. Она через неделю приходит и говорит:\n- Нахуя ты меня выкинул?\n{b} достал соль, после чего {a}, прикидываясь бубликом, выметнулась пулей из бара через неделю.`,
    // {a} = Чебурашка, {b} = Гена
    `Попали {a} и {b} в тюрьму. {a} спрашивает:\n- {b}, а тут битбоксить можно?\n- Не знаю, вон у крысы спроси.\n- Крыса, а тут битбоксить можно?\n- Можно`,
    // {a} = Штирлиц, {b} = Мюллер
    `{a} решил разыграть {b}:\n— А вы знаете, что я русский шпион?\n— Нет, не знаю, — в свою очередь разыграл {b} {a}.`,
    // {a} = Штирлиц, {b} не используется (вставлен для единообразия)
    `{a} сидел в кафе «Элефант» и помешивал кофе вилкой. Он знал, что невероятно рискует, но ему очень хотелось хоть на пять минут почувствовать себя на родине. А {b} в это время смотрел на него из соседнего окна и всё понимал.`
];
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('var-blocks.generate', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        const [a, b] = editor.document
            .getText(editor.selection)
            .split(/[\s,]+/)
            .filter(Boolean);
        const choice = await vscode.window.showQuickPick(['if', 'while', 'анекдот']);
        if (!choice || !a || !b)
            return;
        let code = '';
        if (choice === 'if') {
            code = `if (${a} === ${b}) {\n    // TODO\n} else {\n    // TODO\n}`;
        }
        else if (choice === 'while') {
            code = `while (${a} < ${b}) {\n    // TODO\n}`;
        }
        else if (choice === 'анекдот') {
            const joke = jokes[Math.floor(Math.random() * jokes.length)]
                .replace(/\{a\}/g, a)
                .replace(/\{b\}/g, b);
            // Комментарий: каждый перевод строки тоже префиксуем //
            code = '// ' + joke.split('\n').join('\n// ');
        }
        const line = editor.selection.end.line;
        const pos = new vscode.Position(line, editor.document.lineAt(line).text.length);
        editor.edit(e => e.insert(pos, '\n' + code));
    }));
}
//# sourceMappingURL=extension.js.map