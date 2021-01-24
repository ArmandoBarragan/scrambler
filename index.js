window.addEventListener("load", function () {
    scrambleBtn = document.getElementById('scrambleBtn');
    unscrambleBtn = document.getElementById('unscrambleBtn');

    scrambleBtn.addEventListener('click', function(){
        scramble("originalInput", "scarmbledResult");
    });
    unscrambleBtn.addEventListener('click', function(){
        scramble("scrambledInput", "unscrambledResult");
    });
});

const ORIGINAL_MATRIX = [
    [2, 0, 0],
    [0, 0, 2],
    [0, 2, 0]
]

const REVERSED_MATRIX = [
    [.5, 0, 0],
    [0, 0, .5],
    [0, .5, 0]
]

function scramble(inputId, outputId) {
    var sentence = document.getElementById(inputId).value;
    matrix = decideMatrix(inputId);
    addSpaces(sentence);
    vectors = createVectors(sentence);
    scrambledVectors = multiplySentenceVectors(vectors, matrix);
    finalSentence = createNewSentence(scrambledVectors);
    var output = document.getElementById(outputId);
    output.value = finalSentence;
}

function decideMatrix(inputId){
    if (inputId == "originalInput") {
        matrix = ORIGINAL_MATRIX;
    }
    else {
        matrix = REVERSED_MATRIX;
    }
    return matrix;
}

function createNewSentence(vectors){
    sentence = "";
    for(i in vectors){
        vector = vectors[i];
        for(j in vector){
            character = String.fromCharCode(vectors[i][j]);
            sentence += character;
        }
    }
    return sentence;
}

function addSpaces(sentence) {
    residue = sentence.length % 3;
    if (residue == 1) {
        sentence += "  ";
    }
    else if (residue == 2) {
        sentence += " ";
    }
}

function multiplySentenceVectors(vectors, matrix) {
    newVectorArray = [];
    for (i in vectors) {
        vector = vectors.pop();
        vector = multiplyVector(vector, matrix);
        newVectorArray.push(vector);
    }
    return newVectorArray;
}

function multiplyVector(vector, matrix) {
    newVector = [];
    for (i in vector) {
        component = 0        
        for (j in vector) {
            component += vector[i] * matrix[i][j];
        }
        newVector.push(component);
    }
    return newVector;
}

function createVectors(sentence) {
    vectors = [];
    for (i = 0; i < sentence.length; i += 3) {
        vector = [];
        for (j = 0; j < 3; j++){
            character = sentence.charCodeAt(i + j)    
            if (isNaN(character)){
                character = 32;
            }
            vector.push(character);
        }
        vectors.push(vector);
    }
    return vectors;
}