 const generateQuestionElement = (questionText, name) => {
    let div = document.createElement('div');
    div.classList.add('question-block', 'row');
    
    let h4 = document.createElement('h4');
    h4.classList.add('h4');
    h4.textContent = questionText;
    
    let formDiv = document.createElement('div');
    formDiv.classList.add('form-group', 'col-xs-8');
    
    let labelDiv = document.createElement('div');
    labelDiv.classList.add('col-xs-12');
    
    let leftSpan = document.createElement('span');
    leftSpan.classList.add('pull-left');
    leftSpan.textContent = '1.0 - (Strongly Disagree)';
    
    let rightSpan = document.createElement('span');
    rightSpan.classList.add('pull-right');
    rightSpan.textContent = '(Strongly Agree) - 5.0';
    
    let input = document.createElement('input');
    input.type = 'range';
    input.name = name;
    input.value = '3';
    input.min = '1';
    input.max = '5';
    input.step = '0.5'
    input.required = true;
    
    let output = document.createElement('output');
    output.name = name;
    output.classList.add('text-center');
    output.textContent = '3.0';

    labelDiv.appendChild(leftSpan);
    labelDiv.appendChild(rightSpan);

    formDiv.appendChild(labelDiv);
    formDiv.appendChild(input);
    formDiv.appendChild(output);

    div.appendChild(h4);
    div.appendChild(formDiv);

    document.querySelector('div.question-container').appendChild(div);
};

// Read question Array and write to DOM
questionArray.map((question, i) => {
    generateQuestionElement(question, `question${i}`)
});

//Select input elements
let questionRangeArray = Array.from(
    document.querySelectorAll('div.question-block input[type=range]')
);
//Add click listeners to each input
questionRangeArray.map((range) => {
    range.addEventListener('input', (event) => {
        document.querySelector(`output[name=${event.srcElement.name}]`)
        .textContent = parseFloat(event.srcElement.value).toFixed(1);
    });
});

function Friend (name, photo, scoreArray) {
    this.name = name;
    this.photo = photo;
    this.scores = scoreArray;
}

//Handle click events
document.querySelector('button[type=submit]').addEventListener('click', (event) => {
    let scoreArray = [];
    questionRangeArray.map((question) => {
        scoreArray.push(question.value);
    });

    console.log(new Friend('', '', scoreArray));
});