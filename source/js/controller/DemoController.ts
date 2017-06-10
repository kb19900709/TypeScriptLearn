import { BaseController } from './base/BaseController';

let htmlTemplate =
    '<form id="testBlock">'
    + '<input id="name" type="text">名字<br>'
    + '<input id="birthday" type="text">生日<br>'
    + '<input id="result" type="text">結果<br>'
    + '<button type="button" id="submitBtn">送出資料</button>'
    + '</form>';

export class DemoController implements BaseController {
    public init(id: string): void {
        $(`#${id}`).append(htmlTemplate);
        $('#submitBtn').click(() => {
            // 期望測試監聽的函數請勿直接當成參數傳遞，將導致監聽失敗... 如 $('#submitBtn').click(this.onSubmit);
            this.onSubmit();
        });
    }

    public onSubmit(): void {
        let birthDay = new Date($('#birthday').val());
        let timeDiff = Math.abs(new Date().getTime() - birthDay.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        $('#result').val(Math.floor(diffDays / 365));
    }
}