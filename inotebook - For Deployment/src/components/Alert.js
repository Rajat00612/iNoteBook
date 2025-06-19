import React from 'react'

export default function alert(props) {
const capitalize =(word)=>{
    if(word==="danger"){
        word="error: "
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);}
  return (
   props.alert && <div class={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
  <b> {capitalize(props.alert.type)}   {props.alert.msg} </b>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
  )
}