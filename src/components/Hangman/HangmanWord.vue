<template>
<div>
    <li v-for="letter in letters" v-bind:key="letter.value">
        <div class="letter-div"><span :class="letter.class" :discovered="letter.discovered">{{letter.value}}</span></div>
    </li>
    <span>{{definition}}</span>
</div>
</template>

<script>
export default {
    name: "HangmanWord",
    props: ['guessedLetters', 'word'],
    data() {
        return {
            letters: new Array(),
            definition:""
        }
    },
    methods: {
        checkTotalDiscovered: function () {
            var totalDiscovered = 0;
            for (var j = 0; j < this.letters.length; j++) {
                if (this.letters[j].discovered === true) {
                    totalDiscovered++;
                }
            }

            if (totalDiscovered === this.letters.length) {
                this.$emit('word-complete');
            }
        },
        checkGuess: function (newVal) {
            var newDiscovered = 0;

            for (var i = 0; i < newVal.length; i++) {
                for (var j = 0; j < this.letters.length; j++) {
                    if (newVal[i] === this.letters[j].value && this.letters[j].discovered === false) {
                        this.letters[j].discovered = true;
                        this.letters[j].class = this.letters[j].value + " discovered";
                        newDiscovered++;
                    }
                }
            }
            if (newDiscovered === 0) {
                this.$emit('bad-guess');
            }
        }
    },
    watch: {
        word: function (newVal) {
            if (newVal.length > 1) {
                var splitWord = newVal.toUpperCase().split("");
                for (var i = 0; i < splitWord.length; i++) {
                    this.letters.push({
                        value: splitWord[i],
                        discovered: false,
                        class: splitWord[i] + " secret"
                    });
                }
            }else{
                this.letters = new Array();
            }
        },
        definition:function(newVal){
            this.definition = newVal;
        },
        guessedLetters: function (newVal) {
            this.checkGuess(newVal);
            this.checkTotalDiscovered();
        }
    }
}
</script>

<style scoped>
.secret {
    color: transparent;
}
li{
    list-style: none;
    display:inline;
}
div.letter-div{
    border-bottom:0.2vw solid #000000;
    width:2vw;
    display:inline-block;
    margin:0.2vw;
    font-size:1.5vw;
}
</style>
