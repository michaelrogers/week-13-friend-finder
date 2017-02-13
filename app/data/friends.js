function Friend (name, photo, scoreArray) {
    this.name = name;
    this.photo = photo;
    this.scores = scoreArray;
}

const randomizeArray = (questionCount) => {
    let array = [];
    for (let i = 0; i < parseInt(questionCount); i++) {
        array.push(
            ((Math.ceil(Math.random() * 9) + 1) / 2).toFixed(1)
        );
    }
    return array;
};

module.exports = [
    new Friend('Rachel Green', 'http://vignette4.wikia.nocookie.net/friends/images/3/38/RachelGreen.jpg', randomizeArray(10)),
    new Friend('Phoebe Buffay', 'http://vignette3.wikia.nocookie.net/friends/images/3/30/PhoebeBuffay.jpg', randomizeArray(10)),
    new Friend('Ross Geller', 'http://vignette2.wikia.nocookie.net/friends/images/0/0b/RossGeller.jpg', randomizeArray(10)),
    new Friend('Monica Geller', 'http://vignette2.wikia.nocookie.net/friends/images/4/48/MonicaGeller.jpg', randomizeArray(10)),
    new Friend('Chandler Bing', 'http://vignette4.wikia.nocookie.net/friends/images/2/21/2473459498_a3b4e40781.jpg/', randomizeArray(10)),
    new Friend('Joey Tribbiani Jr.', 'http://vignette1.wikia.nocookie.net/friends/images/f/f5/JoeyTribbiani.jpg/', randomizeArray(10)),
];
