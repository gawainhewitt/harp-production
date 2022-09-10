const fs = require("fs");
const html = fs.readFileSync("./index.html");
document.documentElement.innerHTML = html;

const EventBinders = require("../../eventBinders");

describe("Listeners added to dom", () => {
  it("chord buttons call handler function", () => {
    const eventBinders = new EventBinders();

    const myMock1 = jest.fn();

    let onechord = document.querySelector("#onechord");
    let twochord = document.querySelector("#twochord");
    let threechord = document.querySelector("#threechord");

    eventBinders.bindChordButtons(myMock1);

    onechord.click();
    twochord.click();
    threechord.click();

    expect(myMock1).toHaveBeenCalledWith(0, "#onechord");
    expect(myMock1).toHaveBeenCalledWith(1, "#twochord");
    expect(myMock1).toHaveBeenCalledWith(2, "#threechord");
  });
});
