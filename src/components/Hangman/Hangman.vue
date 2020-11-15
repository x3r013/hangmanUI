<template>
<div>
    <img class="hangingMan" v-if="livesRemaining === 5" alt="Hangman Image" src="../../assets/hangman5.png" />
    <img class="hangingMan" v-if="livesRemaining === 4" alt="Hangman Image" src="../../assets/hangman4.png" />
    <img class="hangingMan" v-if="livesRemaining === 3" alt="Hangman Image" src="../../assets/hangman3.png" />
    <img class="hangingMan" v-if="livesRemaining === 2" alt="Hangman Image" src="../../assets/hangman2.png" />
    <img class="hangingMan" v-if="livesRemaining === 1" alt="Hangman Image" src="../../assets/hangman1.png" />
    <img class="hangingMan" v-if="livesRemaining === 0" alt="Hangman Image" src="../../assets/hangman0.png" />

    <HangmanWord :guessedLetters="guessedLetters" :word="hangmanWord" :definition="hangmanDefinition" v-on:bad-guess="badGuess" v-on:word-complete="wordComplete" />

    <HangmanLetters v-if="isActiveGame()" :livesRemaining="livesRemaining" :guessedLetters="guessedLetters" v-on:letter-selected="letterSelected" />
    <div>
        <select v-model="difficulty">
            <option value="0">Easy</option>
            <option value="1">Medium</option>
            <option value="2">Hard</option>
        </select>
    </div>
    <input class="new-btn" type="button" v-on:click.prevent="setWord" value="New Word" />
    <section v-if="state === 1"><span class="win-msg">{{winMsg}}</span></section>
    <section v-if="state === 2"><span class="lose-msg">{{loseMsg}}</span></section>

    <TopScores :state="state" />
</div>
</template>

<script>
import HangmanLetters from "./HangmanLetters.vue";
import HangmanWord from "./HangmanWord.vue";
import TopScores from '../TopScores.vue'
import axios from "axios";

export default {
    name: "Hangman",
    data() {
        return {
            hangmanWord: "",
            hangmanDefinition: "",
            winMsg: "",
            loseMsg: "",
            fullLives: 5,
            livesRemaining: this.fullLives,
            guessedLetters: new Array(),
            state: 0,
            apiUrl: 'https://localhost:9093/',
            startWord: 0,
            endWord: 0,
            difficulty: "0"
        }
    },
    methods: {
        letterSelected(letter) {
            this.guessedLetters.push(letter);
        },
        badGuess() {
            if (this.isActiveGame()) {
                this.livesRemaining--;
                if (this.livesRemaining < 1) {
                    this.state = 2;
                    this.loseMsg = "You didn't get the right word! - " + this.hangmanWord.toUpperCase();
                    this.hangmanWord = "";
                }
            }
        },
        wordComplete() {
            if (this.isActiveGame()) {
                this.endWord = new Date();
                this.sendScore();
                this.state = 1;
                this.winMsg = "You got the right word! - " + this.hangmanWord.toUpperCase();
                this.hangmanWord = "";
            }
        },
        setWord() {
            this.resetGame();
            this.startWord = new Date();
            var str = "";
            switch (Number(this.difficulty)) {
                case 0:
                    str = 'Word/GetEasy';
                    break;
                case 1:
                    str = 'Word/GetMedium';
                    break;
                case 2:
                    str = 'Word/GetHard';
                    break;
            }

            console.log(str);

            if (localStorage.accessToken) {
                axios.get(this.apiUrl + str, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.accessToken
                        }
                    })
                    .then((response) => {
                        console.log(response);
                        this.hangmanWord = response.data.word;
                        if (response.data.results.length > 0) {
                            this.hangmanDefinition = response.data.results[0].definition;
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }else{
                //window.location.href = '/';
            }
        },
        sendScore() {
            if (localStorage.username && localStorage.accessToken) {
                var time = this.endWord - this.startWord;
                axios.post(this.apiUrl + 'Score', {
                        Word: this.hangmanWord.toUpperCase(),
                        TimeToComplete: Math.round(time / 1000),
                        Difficulty: Number(this.difficulty),
                        Username: localStorage.username
                    }, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.accessToken
                        }
                    })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        resetGame() {
            this.state = 0;
            this.livesRemaining = this.fullLives;
            this.guessedLetters = new Array();
            this.hangmanWord = "";
        },
        isActiveGame() {
            if (this.hangmanWord.length > 1) {
                return true;
            }
            return false;
        }
    },
    components: {
        HangmanLetters,
        HangmanWord,
        TopScores
    }
}
</script>

<style scoped>
.hangingMan {
    width: 25%;
}

input{
    background: #35495E;
    color: #FFFFFF;
    padding: 0.5vw;
    border-radius: 0.5vw;
    margin-top: 1vw;
    cursor: pointer;
}
select{
    padding: 0.5vw;
    margin:1vw;
    border-radius: 0.5vw;
}
</style>
