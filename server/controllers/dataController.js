exports.sectionsData = (req,res,next)=>{
        const mainSection = [
        {
            secNum:1,
            secDescr:'The start - simple words',
            individualLessons:
            {
                lesson1Title: 'Sort the verbs',
                lesson1Question:
                {
                    questionFormat: 'DragAndDrop',
                    title: 'You are given 5 verbs: "ploti", "pulti", "eiti", "laukti" and "sakyti". Sort their english translations in correct order.',
                    possibleAnswers: ["clap", "walk", "say", "wait", "attack"],
                    correctAnswer: ["clap", "attack", "walk", "wait", "say"],
                },
                lesson2Title: 'Find the correct verb',
                lesson2Question:
                {
                    questionFormat: 'SelectOne',
                    title: 'Which one of these 3 words - "clap", "say" or "bake" - means "kepti"?',
                    possibleAnswers: ["ploti", "sakyti", "kepti"],
                    correctAnswer: ["bake"]
                },
                lesson3Title: 'Select the correct verbs',
                lesson3Question: 
                {
                    questionFormat: 'SelectMultiple',
                    title: 'Select all the verbs that have something to do with movement.',
                    possibleAnswers: ["pasilenkti", "sakyti", "galvoti", "eiti", "trenkti"],
                    correctAnswer: ["pasilenkti", "eiti", "trenkti"]
                },
                lesson4Title: 'Find the correct verb',
                lesson4Question:
                {
                    questionFormat: 'SelectOne',
                    title: 'Which verb from the given verbs means "ask" - "ploti", "supti", "laukti" or "klausti?"',
                    possibleAnswers: ["ploti", "supti", "laukti", "klausti"],
                    correctAnswer: ["klausti"]
                },
                lesson5Title: 'Select the correct verb',
                lesson5Question:
                {
                    questionFormat: 'SelectOne',
                    title: 'Which verb means cleaning?',
                    possibleAnswers: ["tvarkyti", "paimti", "supti", "kartoti", "traukti"],
                    correctAnswer: ["tvarkyti"],
                }
            }
        },
        {
            secNum:2,
            secDescr:'Easy and short sentences, situational words',
            individualLessons:
            {
                lesson1Title: 'Translate the sentence',
                lesson1Question:
                {
                    questionFormat: 'SelectOne',
                    title: 'Which lithuanian sentence is the translation of this english sentence: "I took my bags out of the car"?',
                    possibleAnswers: ["Aš paėmiau krepšius iš mašinos", "Eisiu nakvoti kitoje vietoje", "Esu labai dėkingas", "Nereikėjo čia sustoti", "Nusiprausime vėliau"],
                    correctAnswer: ["Aš paėmiau krepšius iš mašinos"]
                },
                lesson2Title: 'Find the words associated with a given situation',
                lesson2Question:
                {
                    questionFormat: 'SelectMultiple',
                    title: 'Choose all given lithuanian words that are associated with cooking',
                    possibleAnswers: ["ratas", "akmuo", "keptuvė", "česnakas", "durys", "prieskoniai"],
                    correctAnswer: ["keptuvė", "česnakas", "prieskoniai"]
                },
                lesson3Title: 'Which sentence best describes the given situation',
                lesson3Question:
                {
                    questionFormat: 'SelectOne',
                    title: 'Which of the given senteces would you be most likely to say in a job interview?',
                    possibleAnswers: ["Einame į parduotuvę", "Rytoj iškepsiu vaflių", "Darbo patirties turiu begalę", "Tomas vakar padarė avariją"],
                    correctAnswer: ["Darbo patirties turiu begalę"]
                },
                lesson4Title: 'Find the words associated with a given situation',
                lesson4Question: 
                {
                    questionFormat: 'SelectMultiple',
                    title: 'Select all the words that are associated with cars.',
                    possibleAnswers: ["ratlankis", "variklis", "krepšys", "tepalai", "valtis"],
                    correctAnswer: ["ratlankis", "variklis", "tepalai"]
                },
                lesson5Title: 'Select the correct sentence',
                lesson5Question:
                {
                    questionFormat: 'SelectOne',
                    title: 'Which lithuanian sentece is the translation of this english sentence: "I took my dog to the vet yesterday, and he gave me some bad news"',
                    possibleAnswers: ["Vakar su šuniu buvau pas veterinarą, kuris pranešė blogą naujieną", "Užvakar su kambarioku iškepėme picą, kuri nebuvo labai skani", "Trečdalis žmonių žemėje turbūt nežino, kaip veikia programavimas"],
                    correctAnswer: ["Vakar su šuniu buvau pas veterinarą, kuris pranešė blogą naujieną"],
                }
            }
        },
        {
            secNum:3,
            secDescr:'Real world sentence applications',
            individualLessons:
            {
                lesson1Title: 'Choose the word order',
                lesson1Question:
                {
                    questionFormat: 'DragAndDropSentence',
                    title: 'Translate this english sentence to lithuanian: "Even though math is hard, i like it',
                    possibleAnswers: ["ir", "yra", "matematika", "Nors", "ji", "man", "patinka", "sunki,"],
                    correctAnswer: ['Nors ir matematika yra sunki, man ji patinka'],
                },
                lesson2Title: 'Find sentences translation',
                lesson2Question:
                {
                    questionFormat: 'SelectOne',
                    title: 'Which english sentence is the translation of this lithuanian sentence: "Ėjau link katedros, kur ir sutikau Pijaus mamą."',
                    possibleAnswers: ["Even though it was raining, Pijus wasn't bothered", "I was going towards the cathedral, where I met Pijus mother", "Because of the cathedral, I met Pijus mother"],
                    correctAnswer: ["I was going towards the cathedral, where I met Pijus mother"]
                },
                lesson3Title: 'Choose the word order',
                lesson3Question:
                {
                    questionFormat: 'SelectOne',
                    title: 'Translate this english sentence to lithuanian: "Because of his strong mind he was able to do that task"',
                    possibleAnswers: ["Vis dėl to, man labiau patinka miegoti vėsiame kambaryje", "Kadangi saulė stipriai kaitina, šiandien striukės nereikės", "Dėl jo stipraus proto jis sugebėjo atlikti tą užduotį"],
                    correctAnswer: ["Dėl jo stipraus proto jis sugebėjo atlikti tą užduotį"]
                },
                lesson4Title: 'Which sentence best describes the given situation',
                lesson4Question: 
                {
                    questionFormat: 'SelectOne',
                    title: 'Select the sentence that you would be most likely to say in a hospital.',
                    possibleAnswers: ["Šauk, bėk, rėk - vis tiek niekas neišgirs", "Galbūt galėtumėte padaryti tyrimą dėl pilvo skausmų?", "Pirma sudedame varškę, ir tik po to dedame grietinę"],
                    correctAnswer: ["Galbūt galėtumėte padaryti tyrimą dėl pilvo skausmų?"]
                },
                lesson5Title: 'Select the correct verb',
                lesson5Question:
                {
                    questionFormat: 'DragAndDrop',
                    title: 'You are given 5 words: "plaukti", "kambarys", "upė", "pavarų dėžė" and "klaustukas". Sort their english translations in correct order.',
                    possibleAnswers: ["river", "gearbox", "question mark", "swim", "room"],
                    correctAnswer: ["swim", "room", "river", "gearbox", "question mark"],
                }
            }
        }
    ]
    res.json(mainSection);

}