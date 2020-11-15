<template>
<div class="top-scores">
    <table>
        <tr>
            <th>Username</th>
            <th>Word</th>
            <th>Difficulty</th>
            <th>Time to Complete</th>
        </tr>
        <tr v-for="score in scores" v-bind:key="score.scoreId">
            <td>{{score.username}}</td>
            <td>{{score.word}}</td>
            <td>{{score.difficulty}}</td>
            <td>{{score.timeToComplete}}</td>
        </tr>
    </table>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "TopScores",
    data() {
        return {
            apiUrl: 'https://localhost:9093/',
            scores: new Array()
        }
    },
    mounted() {
        this.getTopScores();
    },
    props:['state'],
    methods:{
        getTopScores:function(){
            console.log("get top scores");
            axios.get(this.apiUrl + 'Score')
            .then((response) => {
                this.scores = response.data;
                console.log(this.scores);
            });
        }
    },
    watch:{
        state:function(newVal){
            console.log("state update");
            if(newVal === 0 || newVal === 1){
                this.getTopScores();
            }
        }
    }
}
</script>

<style scoped>
    div.top-scores{
        text-align:center;
    }
    table{
        margin:0 auto;
        border:0.1vw solid #CCCCCC;
        border-collapse:collapse;
        margin-top:2vw;
    }
    table td, table th{
        text-align:left;
        padding:0.5vw;
    }
    table th{
        background:#35495E;
        color: #FFFFFF;
    }
    table tr:nth-of-type(2n){
        background:#41B883;
        color:#FFFFFF;
    }
    table tr:nth-of-type(2n+1){
        background:#35495E;
        color:#FFFFFF;
    }
</style>
