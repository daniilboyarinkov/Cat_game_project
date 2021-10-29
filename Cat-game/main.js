if (document.readyState != 'complete') {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
        main()
    }, 2500);}

function main(){
    var day = document.querySelector('.day')
    var day_number = document.getElementById('day-number')
    const rules = document.querySelector('.rules')

    var interactive = document.querySelector('.interactive')
    
    var box1 = document.getElementById("box1")
    var box2 = document.getElementById("box2")
    var box3 = document.getElementById("box3")
    var box4 = document.getElementById("box4")
    var box5 = document.getElementById("box5")
    var boxes = [box1, box2, box3, box4, box5]

    var sun = document.querySelector('.sun')
    let sunCoords = 3
    let cloudCoords = 60
    var cloud = document.querySelector('.cloud')
    var globalCloud = document.querySelector('.globalCloud')
    var bird = document.querySelector('.bird')

    var scene = document.getElementById('scene')
    value = 255
    var night = document.getElementById('night')

    game = new Game()
    cat = new Cat(score=game.getScore())
    cat.Choose_first_box()
    alert(game.Rules())   
    rules.addEventListener('click', () => {
        alert(game.Rules())
    })
    NewDay()
    
    function NewDay() {
        // interactive
        interactive.classList.add('interactive-before-animation')
        interactive.innerHTML = "Доброе утро! <br>В какой коробке кот?"
        raf(() => {
            interactive.classList.add('interactive-show-hide')
        })
        var interactive_morning_handler = () => {
            interactive.classList.remove('interactive-before-animation')
            interactive.classList.remove('interactive-show-hide')
            box1.addEventListener('click', ch1 = function () { ChooseBox(1) })
            box2.addEventListener('click', ch2 = function () { ChooseBox(2) })
            box3.addEventListener('click', ch3 = function () { ChooseBox(3) })
            box4.addEventListener('click', ch4 = function () { ChooseBox(4) })
            box5.addEventListener('click', ch5 = function () { ChooseBox(5) })
            interactive.removeEventListener('animationend', interactive_morning_handler)
        }
        interactive.addEventListener('animationend', interactive_morning_handler)

        // day
        day.classList.add('day-before-animation')
        day_number.innerText = game.getScore()
        raf(() => {
            day.classList.add('day-show')
        })
        raf(() => {
            day.classList.add('day-after-animation')
        })
        function day_handler() {
            day.classList.remove('day-before-animation')
            day.classList.remove('day-show')
            day.removeEventListener('animationend', day_handler)
        }
        day.addEventListener('animationend', day_handler)


    function Night()
    {
        // day
        day.classList.add('day-hide')
        raf(() => {
            day.classList.add('day-before-animation')
        })
        function day_hide_handler() {
            day.classList.remove('day-hide')
            day.classList.remove('day-after-animation')
            day.removeEventListener('animationend', day_hide_handler)
        }
        day.addEventListener('animationend', day_hide_handler)

        night.classList.add('night-go')
            function night_handler() {
                night.classList.remove('night-go')
                night.removeEventListener('animationend', NewDay)
                night.removeEventListener('animationend', night_handler)
            }
            night.addEventListener('animationend', NewDay)
            night.addEventListener('animationend', night_handler)
    }

    function ChooseBox(box) {
        box1.removeEventListener('click',ch1);
        box2.removeEventListener('click',ch2);
        box3.removeEventListener('click',ch3);
        box4.removeEventListener('click',ch4);
        box5.removeEventListener('click',ch5);

        let right = cat.Checkbox(box)
        if ( game.getScore() >= 8 & !right ) {
            interactive.classList.add('interactive-before-animation')
            interactive.innerHTML = "Game over..."
            raf(() => {
                interactive.classList.add('interactive-show-hide')
            })
            function interactive_hide_handler() {
                interactive.classList.remove('interactive-before-animation')
                interactive.classList.remove('interactive-show-hide')
                interactive.removeEventListener('animationend', interactive_hide_handler)
            }
            interactive.addEventListener('animationend', interactive_hide_handler)
        }
        else{
            if (right)
        {
            interactive.style.boxShadow = "#880088 0 0 15px 15px;";
            interactive.style.border = ".25em solid purple";

            interactive.classList.add('interactive-before-animation')
            interactive.innerHTML = `Ура! <br>Вы нашли кота на ${game.getScore()} день <br>Вы настоящий шерлок!`
            raf(() => {
                interactive.classList.add('interactive-show-hide')
            })
            function interactive_hide_handler() {
                interactive.classList.remove('interactive-before-animation')
                interactive.classList.remove('interactive-show-hide')
                interactive.removeEventListener('animationend', interactive_hide_handler)
            }
            interactive.addEventListener('animationend', interactive_hide_handler)

            document.getElementById(`box${box}`).src="./imgs/cat_in_box.png"
        }
        else 
        {
            game.Count()
            sunCoords += 10
            cloudCoords -= 10
            value -= 35;
            //interactive
            interactive.classList.add('interactive-before-animation')
            interactive.innerHTML = "Увы кота здесь нет..."
            raf(() => {
                interactive.classList.add('interactive-show-hide')
            })
            function interactive_hide_handler() {
                interactive.classList.remove('interactive-before-animation')
                interactive.classList.remove('interactive-show-hide')
                interactive.removeEventListener('animationend', DayGo)
                interactive.removeEventListener('animationend', interactive_hide_handler)
            }

            var DayGo = () => {
                // scene
                scene.classList.add('scene-darker')
                function scene_handler() {
                    scene.classList.remove('scene-darker')
                    scene.style.setProperty("--value", value)
                    scene.removeEventListener('animationend', scene_handler)
                }
                scene.addEventListener('animationend', scene_handler)
                // sun
                sun.classList.add('sun-go')
                function sun_handler() {
                    sun.classList.remove('sun-go')
                    sun.style.setProperty("--sunCoords", sunCoords + "%")
                    sun.removeEventListener('animationend', sun_handler)
                }
                sun.addEventListener('animationend', sun_handler)
                // cloud
                cloud.classList.add('cloud-go')
                function cloud_handler() {
                    cloud.classList.remove('cloud-go')
                    cloud.style.setProperty("--cloudCoords", cloudCoords + "%")
                    cloud.removeEventListener('animationend', cloud_handler)
                }
                cloud.addEventListener('animationend', cloud_handler)

                globalCloud.classList.add('globalCloud-go')
                function globalCloud_handler() {
                    globalCloud.classList.remove('globalCloud-go')
                    globalCloud.removeEventListener('animationend', globalCloud_handler)
                }
                globalCloud.addEventListener('animationend', globalCloud_handler)
                // bird
                bird.classList.add('bird-fly')
                function bird_handler() {
                    bird.classList.remove('bird-fly')
                    bird.removeEventListener('animationend', Night)
                    bird.removeEventListener('animationend', bird_handler)
                }
                bird.addEventListener('animationend', Night);
                bird.addEventListener('animationend', bird_handler)
                
            
            }
            interactive.addEventListener('animationend', DayGo)
            interactive.addEventListener('animationend', interactive_hide_handler)

            
            }}
        }
    }
}

function raf(fn){
    window.requestAnimationFrame(function(){
        window.requestAnimationFrame(function(){
            fn();
        })
    })
}
