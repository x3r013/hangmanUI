<template>
<div class="letter-buttons">
    <li v-for="letter in letters" v-bind:key="letter.id">
        <input :disabled="letter.disabled" :value="letter.value" type="button" v-on:click="$emit('letter-selected',letter.value)" />
    </li>
</div>
</template>

<script>
export default {
    name: "HangmanLetters",
    props: ['guessedLetters', 'livesRemaining'],
    mounted() {
        this.resetLetters();
    },
    data() {
        return {
            letters: new Array()
        }
    },
    methods: {
        resetLetters: function () {
            var code = 65;
            this.letters = new Array();
            while (code < 91) {
                this.letters.push({
                    id: this.letters.length,
                    disabled: false,
                    value: String.fromCharCode(code)
                });
                code++;
            }
        },
    },
    watch: {
        guessedLetters: function (newVal) {
            for (var i = 0; i < newVal.length; i++) {
                for (var j = 0; j < this.letters.length; j++) {
                    if (newVal[i] === this.letters[j].value && this.letters[j].disabled === false) {
                        this.letters[j].disabled = true;
                    }
                }
            }
        },
        livesRemaining: function (newVal) {
            if (newVal < 1) {
                for (var i = 0; i < this.letters.length; i++) {
                    this.letters[i].disabled = true;
                }
            } else if (newVal >= 5) {
                for (var j = 0; j < this.letters.length; j++) {
                    this.letters[j].disabled = false;
                }
            }
        }
    }
}
</script>

<style scoped>
li {
    list-style: none;
    display: inline;
}

input {
    background: #000000;
    color: #FFFFFF;
    border: none;
    margin: 0.1vw;
    padding: 0.5vw;
    width: 2.5vw;
    height: 2.5vw;
    border-radius: 2.5vw;
    cursor: pointer;
}

input:disabled {
    cursor: default;
    background: #CCCCCC;
}

div.letter-buttons {
    margin-top: 1vw;
}
</style>
