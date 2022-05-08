let kino = {

    log: false,
    userid: '',
    filmid: '',

    index: function(){
        if(this.log == false){
            document.body.innerHTML = 
            "<h1> Twoje Kino </h1>"+
            "<h2> zawsze w zasięgu wzroku </h2>"+
            "<img src='logo.png'></img>"+
            "<br></br>"+
            "<button onclick='kino.login()'> Zaloguj się </button>"+
            "<button onclick='kino.register()'> Zarejestruj się </button>"
        }else{
            document.body.innerHTML = 
            "<h1> Twoje Kino </h1>"+
            "<h2> zawsze w zasięgu wzroku </h2>"+
            "<img src='logo.png'></img>"+
            "<br></br>"+
            "<button onclick='kino.reservation()'> Rezerwacja </button>"+
            "<button onclick='kino.logout()'> Wyloguj się </button>"
        }
    },

    login: function(){
        document.body.innerHTML = 
        "<h1> Twoje Kino </h1>"+
        "<h2> zawsze w zasięgu wzroku </h2>"+
        "<br></br>"+
        "<form onsubmit='kino.loginaction(event)'>"+
            "<label for='login'> Login: </label>"+
            "<input type='text' id='login' name='login'><br><br>"+
            "<label for='password'> Hasło: </label>"+
            "<input type='password' id='password' name='password'><br><br>"+
            "<input type='submit' value='Zaloguj się'>"+
        "</form>"+
        "<br></br>"+
        "<button onclick='kino.index()'> Strona główna </button>"+
        "<button onclick='kino.register()'> Zarejestruj się </button>"
    },

    register: function(){
        document.body.innerHTML = 
        "<h1> Twoje Kino </h1>"+
        "<h2> zawsze w zasięgu wzroku </h2>"+
        "<br></br>"+
        "<form onsubmit='kino.registeraction(event)'>"+
            "<label for='login'> Login: </label>"+
            "<input type='text' id='login' name='login'><br><br>"+
            "<label for='password'> Hasło: </label>"+
            "<input type='password' id='password' name='password' minlength=8><br><br>"+
            "<label for='numer'> Telefon: </label>"+
            "<input type='number' id='numer' name='numer'><br><br>"+
            "<input type='submit' value='Zarejestruj się'>"+
        "</form>"+
        "<br></br>"+
        "<button onclick='kino.index()'> Strona główna </button>"+
        "<button onclick='kino.login()'> Zaloguj się </button>"
    },

    registeraction: async function(e){
        e.preventDefault()
        if(e.target.login.value != "" && e.target.password.value != "" && (e.target.numer.value).length == 9){
            const data = new FormData(e.target)
            const res = await ( await fetch("http://localhost/stadnik/register.php", {
                method: 'POST',
                body: data,
            })).json()
            if(res == "error"){
                alert("Konto już istnieje :(")
                document.getElementById('login').value = ""
                document.getElementById('password').value = ""
                document.getElementById('numer').value = ""
            }else{
                alert("Konto zostało utworzone :)") 
                kino.index()
            }
        }else{
            alert("Coś jest nie tak :(")
            document.getElementById('login').value = ""
            document.getElementById('password').value = ""
            document.getElementById('numer').value = ""
        }
    },

    loginaction: async function(e){
        e.preventDefault()
        const data = new FormData(e.target)
        const res = await ( await fetch("http://localhost/stadnik/login.php", {
            method: 'POST',
            body: data,
        })).json()
        if(res != "error"){
            alert("Zalogowano")
            this.userid = res.id
            this.log = true
            this.index()
        }else{
            alert("Coś jest nie tak")
            document.getElementById('login').value = ""
            document.getElementById('password').value = ""
        }
    },

    logout: function(){
        alert("Wylogowano")
        this.log = false
        this.userid = ''
        this.index()
    },

    reservation: function(){
        document.body.innerHTML = 
        "<h1> Twoje Kino </h1>"+
        "<h2> zawsze w zasięgu wzroku </h2>"+
        "<br></br>"+
        "<select id='day' onchange='kino.film()'></select>"+
        "<select id='film' onchange='kino.sala()'></select>"+
        "<div id='sala'></div>"+
        "<br></br>"+
        "<button onclick='kino.reserv()'> Zarezerwuj </button>"+
        "<button onclick='kino.index()'> Strona główna </button>"
        this.day()
        this.film()
    },

    day: async function(){
        const res = await ( await fetch("http://localhost/stadnik/day.php")).json()
        add = ''
        for(i=0; i<res.length; i++){
            add += "<option value='"+res[i].day+"'>"+res[i].day+"</option>"
        }
        document.getElementById("day").innerHTML = add
        this.film()
    },

    film: async function(){
        const data = document.getElementById("day").value
        let form = new FormData()
        form.append("day", data)
        const res = await ( await fetch("http://localhost/stadnik/film.php", {
            method: 'POST',
            body: form,
        })).json()
        add = ''
        for(i=0; i<res.length; i++){
            add += "<option value='"+res[i].id+"'>"+res[i].time+"   "+res[i].title+"</option>"
        }
        document.getElementById("film").innerHTML = add
        this.sala()
    },

    sala: async function(){
        this.filmid = document.getElementById("film").value
        const data1 = this.userid
        const data2 = this.filmid
        let form = new FormData()
        form.append("userid", data1)
        form.append("filmid", data2)
        const res = await ( await fetch("http://localhost/stadnik/sala.php", {
            method: 'POST',
            body: form,
        })).json()
        console.log(res)
        let add = ''
        for(i=1;i<301;i++){
            add += "<div id='"+i+"'></div>"
        }
        document.getElementById('sala').innerHTML = add

        for(i=1;i<301;i++){
            div = document.getElementById(i)
            div.style.backgroundColor = 'white'
            div.onclick = function(){
                if(this.style.backgroundColor == "white"){
                    this.style.backgroundColor = "green"
                }else{
                    this.style.backgroundColor = "white"
                }
            }
        }
        for(i=0; i<res[0].length; i++){
            div = document.getElementById(res[0][i].nr)
            div.style.backgroundColor = 'red'
            div.onclick = null
        }
        for(i=0; i<res[1].length; i++){
            div = document.getElementById(res[1][i].nr)
            div.style.backgroundColor = 'green'
            div.onclick = function(){
                if(this.style.backgroundColor == "white"){
                    this.style.backgroundColor = "green"
                }else{
                    this.style.backgroundColor = "white"
                }
            }
        }
    },

    reserv: async function(){
        let tab = []
        for(i=1; i<301; i++){
            div = document.getElementById(i)
            if(div.style.backgroundColor == 'green'){
                tab.push(i)
            }
        }
        const data1 = this.userid
        const data2 = this.filmid
        let form = new FormData()
        form.append("userid", data1)
        form.append("filmid", data2)
        const res = await ( await fetch("http://localhost/stadnik/clear.php", {
            method: 'POST',
            body: form,
        })).json()
        for(i=0; i<tab.length; i++){
            const data1 = this.userid
            const data2 = this.filmid
            const data3 = tab[i]
            let form = new FormData()
            form.append("userid", data1)
            form.append("filmid", data2)
            form.append("nr", data3)
            const res = await ( await fetch("http://localhost/stadnik/reserv.php", {
                method: 'POST',
                body: form,
            })).json()
        }
        alert("Miejsca zostały zarezerwowane")
    }

}