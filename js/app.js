(function(){

    var app = document.getElementById('app');
    var inputChar = document.getElementById('char');

    var config = {
        char: parseInt(inputChar.value),
        symbol: true,
        number: true,
        uppercase: true,
        lowercase: true
    }

    var char = {
        number: '0 1 2 3 4 5 6 7 8 9',
        symbol: '! @ # $ % ^ & * ( ) { [ ] } / ? . \ | - = +',
        uppercase: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        lowercase: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    }

    // Evento para evitar que se refresque la página
    app.addEventListener('submit', function(e){
        e.preventDefault();
    });

    // Evento para el manejo de los botones "-" y "+"
    app.elements.namedItem('btn-minus').addEventListener('click', function(){
        if (config.char > 1) {
            config.char -= 1;
            inputChar.value = config.char
        }    
    });

    app.elements.namedItem('btn-plus').addEventListener('click', function(){
        config.char += 1;
        inputChar.value = config.char;
    });

    app.elements.namedItem('btn-symbol').addEventListener('click', function(){
        btnToggle(this);
        config.symbol = !config.symbol;
    });

    app.elements.namedItem('btn-number').addEventListener('click', function(){
        btnToggle(this);
        config.number = !config.number;
    });

    app.elements.namedItem('btn-uppercase').addEventListener('click', function(){
        btnToggle(this);
        config.uppercase = !config.uppercase;
    });

    app.elements.namedItem('btn-generate').addEventListener('click', function(){
        generatePassword();
    });

    app.elements.namedItem('input-password').addEventListener('click', function(){
        copyPassword();
    })

    // Funciones

    function btnToggle(element){
        element.classList.toggle('false');
        element.childNodes[0].classList.toggle('fa-check');
        element.childNodes[0].classList.toggle('fa-times');
    }


    // Esta función itera cada una de las propiedades de config para ver si las añade o quita de la contraseña final
    function generatePassword(){
        var finalChar = '';
        var password = '';

        for(property in config){
            if(config[property] == true){
                finalChar += char[property] + ' ';
                
            }
        }
        
        // Método trim quita los espacios al principio y al final de las cadenas de texto
        finalChar = finalChar.trim();

        // Metodo split: guarda los valores en un array
        finalChar = finalChar.split(' ');

        for(var i = 0; i < config.char; i++){
            password += finalChar[Math.floor(Math.random() * finalChar.length)];
        }

        app.elements.namedItem('input-password').value = password;
    }

    function copyPassword(){
        app.elements.namedItem('input-password').select();
        document.execCommand('copy');
        document.getElementById('alert-copied').classList.add('active');
        setTimeout(function(){
            document.getElementById('alert-copied').classList.remove('active'); 
        }, 2000);
    }

    generatePassword();
}())