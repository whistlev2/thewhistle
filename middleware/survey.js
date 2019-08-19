import axios from 'axios'

export default function (context) {
  console.log("SURVEY middleware");
  axios.get('http://localhost:3000/surveyjson').then(function(v){
    context.survey = v;
    return context
  })
}
