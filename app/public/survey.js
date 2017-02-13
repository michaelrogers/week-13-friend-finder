document.addEventListener('DOMContentLoaded', () => {
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
    //Constructor to add friend
    function Friend (name, photo, scoreArray) {
        this.name = name;
        this.photo = photo;
        this.scores = scoreArray;
    }
    //Generic Request Handler
    const ajaxRequest = (requestPath, requestData, callback, requestType = "GET") => {
        let req = new XMLHttpRequest();
        req.open(requestType, requestPath, true);
        req.onreadystatechange = () => {
            if (req.readyState != 4 || req.status != 200) return false;
            else callback(req);
        };
        req.send(requestData);
    };

   const isAlpha = /^[a-zA-Z ]*$/;
   const isImagePath = /.*?(\/[\/\w\.]+)[\s\?]?.*/;

    //Handle click events
    document.querySelector('button[type=submit]').addEventListener('click', (event) => {
        event.preventDefault();
        let scoreArray = [];
        questionRangeArray.map((question) => {
            scoreArray.push(question.value);
        });
        let userName = document.querySelector('input[name=userName]').value.trim();
        let userPhoto = document.querySelector('input[name=userImage]').value.trim();
        if (isAlpha.test(userName) &&
            isImagePath.test(userPhoto) &&
            scoreArray.length > 0
            ) {
            let userProfile = new Friend(userName, userPhoto, scoreArray);
            ajaxRequest(
                "/api/friends", JSON.stringify(userProfile), (req) => {
                //Populate user profile
                document.querySelector('#userProfile h3.h3').textContent = userProfile.name;
                document.querySelector('#userProfile img.img-responsive').src = userProfile.photo;

                //Populate match profile
                let parsedResponse = JSON.parse(req.responseText);
                document.querySelector('#matchProfile h3.h3').textContent = parsedResponse.friendObject.name;
                document.querySelector('#matchProfile img.img-responsive').src = parsedResponse.friendObject.photo;

                $('#modal-match').modal('show');
                console.log(parsedResponse);
            }, "POST");
        } else alert ("Please complete the entire form and use a valid image.");
    });


    

});
