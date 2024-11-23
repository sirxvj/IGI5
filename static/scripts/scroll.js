
const plane = document.querySelector('.plane-rotate');
    
window.addEventListener('scroll',()=>{
    let value = scrollY;
    // mountainLeft.style.left = `-${value/0.7}px`
    // cloud2.style.left = `-${value*2}px`
    // mountainRight.style.left = `${value/0.7}px`
    // cloud1.style.left = `${value*2}px`
    // text.style.bottom = `-${value}px`;
    // man.style.height = `${window.innerHeight - value}px`
    plane.style.transform = `rotate(${value/1.5}deg)`
    //plane.style.rotate = `${value+1}deg`;
})