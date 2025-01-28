document.querySelector("#RiverdaleSelector").addEventListener('change', function(){
    let url = this.value;
    window.open(url, '_blank');
})

document.querySelector("#btn").addEventListener('submit', function(e){
    alert("Form submitted successfully!!!")
});
