const { doc, setDoc, getFirestore, getDoc } = require("firebase/firestore"); 
const {app} = require('./authController');
const { summary } = require('date-streaks');

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
                    possibleAnswers: ["clap", "say", "bake"],
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
                    title: 'Which of the given sentences would you be most likely to say in a job interview?',
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
                    title: 'Which lithuanian sentence is the translation of this english sentence: "I took my dog to the vet yesterday, and he gave me some bad news"',
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
                    questionFormat: 'DragAndDrop',
                    title: 'Translate this english sentence to lithuanian: "Even though math is hard, i like it"',
                    possibleAnswers: ["ir", "yra", "matematika", "Nors", "ji", "man", "patinka", "sunki,"],
                    correctAnswer: ['Nors', 'ir', 'matematika', 'yra', 'sunki,', 'man', 'ji', 'patinka'],
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
                    questionFormat: 'SelectMultiple',
                    title: 'You are given 5 sentences: "Pilki pingvinai", "Tikiuosi ilgai laukti neteks", "Ispanijoje buvo geriau", "Jau metas keisti padangas" and "Pirma dedame pomidorus, tada alyvuoges". Which 3 sentences you most likely would not say in a car dealership?',
                    possibleAnswers: ["Pilki pingvinai", "Tikiuosi ilgai laukti neteks", "Ispanijoje buvo geriau", "Jau metas keisti padangas", "Pirma dedame pomidorus, tada alyvuoges"],
                    correctAnswer: ["pilki pingvinai", "Ispanijoje buvo geriau", "pirma dedame pomidorus, tada alyvuoges"],
                }
            }
        },
        {
            secNum:4,
            secDescr:'Conversational sentences',
            individualLessons:
            {
                lesson1Title: 'Choose the sentence order',
                lesson1Question:
                {
                    questionFormat: 'DragAndDrop',
                    title: 'Translate this english sentence to lithuanian and sort the words in correct order: "The weather yesterday was horrible"',
                    possibleAnswers: ["bjaurus", "buvo", "Vakar", "oras"],
                    correctAnswer: ['Vakar', 'oras', 'buvo', 'bjaurus'],
                },
                lesson2Title: 'Find the translation of a given sentence',
                lesson2Question:
                {
                    questionFormat: 'SelectOne',
                    title: 'Which english sentence is the translation of this lithuanian sentence: "Vairavimo egzaminą išlaikiau iš trylikto karto"',
                    possibleAnswers: ["I passed my driving exam in my thirteenth time", "I failed my driving exam thirteen times", "My driving exam has failed me thirteen times"],
                    correctAnswer: ["I passed my driving exam in my thirteenth time"]
                },
                lesson3Title: 'Select the correct translation',
                lesson3Question:
                {
                    questionFormat: 'SelectOne',
                    title: 'Which out of the given sentences is the translation of this english sentence: "Who knows - someone could be spying on me through my phone"',
                    possibleAnswers: ["Kažkas žino, kad aš juos šnipinėju", "Kas žino - kažkas gali mane šnipynėti per mano telefoną", "Nieks nežino - šnipinėja juos ar ne"],
                    correctAnswer: ["Kas žino - kažkas gali mane šnipynėti per mano telefoną"]
                },
                lesson4Title: 'Which sentence best describes the given situation',
                lesson4Question: 
                {
                    questionFormat: 'SelectOne',
                    title: 'Select the sentence that you would be most likely to say in a clothes store',
                    possibleAnswers: ["Nuostabus audinys! Koks jo pavadinimas?", "Nuostabus pastatas! Kas jo architektas?", "Važiuojame, pakeisime pavarų dėžę ir grįšime."],
                    correctAnswer: ["Nuostabus audinys! Koks jo pavadinimas?"]
                },
                lesson5Title: 'Select the correct verb',
                lesson5Question:
                {
                    questionFormat: 'SelectMultiple',
                    title: 'You are given 5 sentences. Which 3 sentences are ok to say to a computer science student?',
                    possibleAnswers: ["Civilinė indžinerija geriau", "Sunkiai mokinkis dabar, kad ateityje būtų lengviau", "Programavimas - tikrai sunkios studijos", "Kompiuteriai yra tiesiog nuliai ir vienetai", "Tau reikėjo rinktis psichologijos studijas"],
                    correctAnswer: ["Sunkiai mokinkis dabar, kad ateityje būtų lengviau", "Programavimas - tikrai sunkios studijos", "Kompiuteriai yra tiesiog nuliai ir vienetai"],
                }
            }
        }
    ]
    res.json(mainSection);
//x
}
exports.saveFinishedLessonData = async(req,res,next)=>{
    const badDnDAnswers = req.body.badAnswersArr.filter(singleBadAnswer => singleBadAnswer.questionFormat=='DragAndDrop');
    const badSelectAnswers = req.body.badAnswersArr.filter(singleBadAnswer => typeof singleBadAnswer.questionTitle == 'string');
    const UID = req.body.UID;
    const goodAnswers = req.body.goodAnswersArr;
    const sectionNumber = `section${req.body.sectionNumber}`;
console.log('SAVING FINISHED LESSON DATAA')
    const db = getFirestore(app);

    let oldUserPoints;
    await getDoc(doc(db, "users", `${UID}`))
    .then(async result=>{
        oldUserPoints = result.data().userPoints;
        let newUserPoints = oldUserPoints + (goodAnswers.length/(goodAnswers.length+badDnDAnswers.length+badSelectAnswers.length))*5;
        let newActivePerks = result.data().activePerks;
    
        // do this if user has Doubly-pointy perk(doubles the points received from a single lesson)
        result.data().activePerks.map((singlePerk,index)=>{
            if(singlePerk=='Doubly-pointy'){
                // double the points that were gotten from the last lesson
                newUserPoints += (newUserPoints-oldUserPoints);
    
                // remove the Doubly-pointy perk from user.
                console.log(newActivePerks);
                newActivePerks.splice(index,1);
                console.log(newActivePerks);
            }
        })


    // else, continue with this
    if(newActivePerks==null){
        await setDoc(doc(db, "users", `${UID}`), {
        [`${sectionNumber}`]:{
            badDnDAnswers,
            badSelectAnswers,
            goodAnswers
        },
        userPoints: newUserPoints,
    },{merge: true});
    } else {
        await setDoc(doc(db, "users", `${UID}`), {
            [`${sectionNumber}`]:{
                badDnDAnswers,
                badSelectAnswers,
                goodAnswers
            },
            userPoints: newUserPoints,
            activePerks: newActivePerks
        },{merge: true});
    }
    })





    res.json({});
}
exports.getUserMistakes = async(req,res,next)=>{
    const UID = req.body.UID;

    const db = getFirestore(app);

    const docRef = doc(db, "users", `${UID}`);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
    
    function badSelectAnswersObject(questionTitle, correctAnswer, userAnswer){
        this.questionTitle = questionTitle;
        this.correctAnswer = correctAnswer;
        this.userAnswer = userAnswer;
    }
    function badDnDAnswersObject(questionTitle, correctAnswer, possibleAnswer){
        this.questionTitle = questionTitle;
        this.correctAnswer = correctAnswer;
        this.possibleAnswer = possibleAnswer;
    }
    function singleSectionsBadAnswers(badDnDAnswers, badSelectAnswers, sectionNumber){
        this.badDnDAnswers = badDnDAnswers;
        this.badSelectAnswers = badSelectAnswers;
        this.sectionNumber = sectionNumber;
    }

    let doesUserHaveMistakes = false;

    if(docSnap.exists()) {
        const finalArrayToSend = [];
        console.log(docSnap.data())
        Object.entries(docSnap.data()).map(sectionData=>{
            if(!sectionData[1].badSelectAnswers)return;

            const badSelectAnswers = [];
            const badDnDAnswers = [];
            let sectionNumber = sectionData[0].slice(-1);

            // creating the badSelectAnswers object
            sectionData[1].badSelectAnswers.map(singleBadSelectAns=>{
                if(sectionData[1].badSelectAnswers.length>0)doesUserHaveMistakes=true;

                const questionTitle = singleBadSelectAns.questionTitle;
                const correctAnswer = singleBadSelectAns.questionObject.correctAnswer;
                const userAnswer = singleBadSelectAns.answeredWord;
    
                const newBadSelectAnswersObject = new badSelectAnswersObject(questionTitle, correctAnswer, userAnswer);
                badSelectAnswers.push(newBadSelectAnswersObject);
            })

            // creating the badDnDAnswers object
            sectionData[1].badDnDAnswers.map(singleBadDnDAns=>{
                if(sectionData[1].badDnDAnswers.length>0)doesUserHaveMistakes=true;


                const questionTitle = singleBadDnDAns.title;
                const correctAnswer = singleBadDnDAns.correctAnswer;
                const possibleAnswer = singleBadDnDAns.possibleAnswers;

                const newBadDnDAnswersObject = new badDnDAnswersObject(questionTitle, correctAnswer, possibleAnswer);
                badDnDAnswers.push(newBadDnDAnswersObject);
            })
            const sectionsAllBadAnswers = new singleSectionsBadAnswers(badDnDAnswers, badSelectAnswers, sectionNumber);
            finalArrayToSend.push(sectionsAllBadAnswers);

        })
        console.log(finalArrayToSend)
        if(doesUserHaveMistakes==true){
            res.json(finalArrayToSend)
        } else {
            res.json([]);
        }
        
    } else {
        // doc.data() will be undefined in this case
        res.json([])
        console.log("No such document!");
    }
}
exports.getUsersScore = async(req,res,next)=>{
    const UID = req.body.UID;

    const db = getFirestore(app);

    const docRef = doc(db, "users", `${UID}`);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
        const finalArrayToSend = [];

        Object.entries(docSnap.data()).map(sectionData=>{
            if(!sectionData[1].badSelectAnswers)return;
            console.log(sectionData);

            const badAnswersQnty = sectionData[1].badSelectAnswers.length+sectionData[1].badDnDAnswers.length;
            const goodAnswersQnty = sectionData[1].goodAnswers.length;
            const sectionScore = parseFloat(((goodAnswersQnty/(badAnswersQnty+goodAnswersQnty))*100).toString().slice(0,5));
            finalArrayToSend.push({badAnswersQnty, goodAnswersQnty, sectionScore});

        })
        console.log(finalArrayToSend)
        res.json(finalArrayToSend)
    } else {
        // doc.data() will be undefined in this case
        res.json([])
        console.log("No such document!");
    }
}
exports.updateDailyStreak = async(req,res,next)=>{
    const UID = req.body.UID;
    console.log('CIA VYKSTA UPDATEEEE')
    const db = getFirestore(app);
    
    const docRef = doc(db, "users", `${UID}`, 'loginData','timesWhenLoggedin');
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
        const lastDayLoggedIn_InDB = docSnap.data().timesLoggedIn[docSnap.data().timesLoggedIn.length-1]

        const date = new Date();
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const currentDateFormated = `${year}-${month}-${day}`;

        if(currentDateFormated!=lastDayLoggedIn_InDB){
            await setDoc(docRef, {
                timesLoggedIn: [...docSnap.data().timesLoggedIn, currentDateFormated],
            },{merge: true});
        }
    }
    res.json({});

}
exports.getDailyStreak = async(req,res,next)=>{
    const UID = req.body.UID;

    const db = getFirestore(app);

    const docRef = doc(db, "users", `${UID}`, 'loginData','timesWhenLoggedin');
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        console.log(docSnap.data().timesLoggedIn)
       res.json(summary(docSnap.data().timesLoggedIn).currentStreak)

    } else {
        // doc.data() will be undefined in this case
        res.json([])
        console.log("No such document!");
    }
}
exports.getUserPoints = async(req,res,next)=>{
    const UID = req.body.UID;

    const db = getFirestore(app);

    const docRef = doc(db, "users", `${UID}`);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        res.json({UP: docSnap.data().userPoints});
    } else {
        // doc.data() will be undefined in this case
        res.json([])
        console.log("No such document!");
    }
}
exports.buyPerk = async(req,res,next)=>{
    const UID = req.body.UID;
    const perkName = req.body.perkName;
    perks = [
        {
            name: 'Doubly-pointy',
            desc: 'Double points - double the points that you get from your next lesson.',
            price: 2
        },
        {
            name: 'Lesson skipper',
            desc: 'lesson skip - skip the next lesson.',
            price: 1
        },
    ]
    const db = getFirestore(app);

    const docRef = doc(db, "users", `${UID}`);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        userPoints = docSnap.data().userPoints;
        activePerks = docSnap.data().activePerks;

        for(let i = 0; i < activePerks.length; i++){
            if(activePerks[i]==perkName){
                // user already has the perk they are trying to buy;
                res.json('You already own this perk!');
                return;
            }
        }


        for(perk of perks){
            if(perk.name==perkName){
                    console.log(perk);
                if(userPoints>=perk.price){
                    // able to purchase the park.
                    const boughtPerk = perk.name;
                    // subtract the UserPoints from db
                    await setDoc(docRef,{
                        userPoints: userPoints-perk.price,
                        activePerks: [...activePerks, boughtPerk],
                    },{merge: true});

                    res.json({perk: perk.name, isPurchased: true, UPafterPurchase: userPoints-perk.price})
                } else{
                    res.json('Not enough UserPoints');
                }
            }
        }

    } else {
        // doc.data() will be undefined in this case
        res.json([])
        console.log("No such document!");
    }
}