var tab = "&nbsp;&nbsp;&nbsp;&nbsp;";

var helpFile = `
AVAILABLE COMMANDS: <br/>
 - HELP: SHOW THIS MESSAGE <br/>
 - LIST [data] <br/>
${tab}OPTIONS [data]: <br/>
${tab}${tab}- LEVEL2 <br/>
${tab}${tab}- EXTRACURRICULAR <br/>
 - PERSONALSTATEMENT: PRINT MY PERSONAL STATEMENT <br/>
 - RAMTEST.COM: RUN A RAMTEST <br/>
`;

var level2_table = `
<pre class="nicetext">
+---------------------+---------------+
|       Subject       |     Grade     |
+---------------------+---------------+
|   B-TEC Computing   | Distinction*2 |
| Religious Education |       9       |
|       Biology       |       9       |
|      Chemistry      |       9       |
|       Physics       |       8       |
|        German       |       9       |
|   English Language  |       8       |
|  English Literature |       8       |
|   Computer Science  |       7       |
|       History       |       9       |
|        Maths        |       9       |
|    Further Maths    |       9       |
|   German Speaking   |  Distinction  |
|   English Speaking  |  Distinction  |
+---------------------+---------------+
</pre>
`;

var extracurric_table = `
<pre class="nicetext">
- Silver Duke of Edinburgh (2019-2020)
Skills Learned: Community support, teamwork, cookery, and the benefits of daily exercise 

- Gold Duke of Edinburgh (2021-Present)
Skills Learned: The importance of protecting our environment

- UKMT Maths Challenge (2017-Present)
Skills Learned: Problem solving, working under time constraints and mathematical thinking 
</pre>
`;

var personal_statement = `
<pre class="nicetext">
My love for computing began when I was seven as I received a Raspberry Pi as a gift from my parents. Through my incessant tinkering, I found I was fascinated by programming and technology. Due to projects like Scratch, which gave me the entrance to programming, I was able to let my creativity run wild. Especially when I discovered I could explore the source code and expand my abilities to understand and develop open-source projects. Over the last ten years, I have experienced many different programming languages (ReactJS, C++, Mallard-80/Jetsam, FreeBASIC, SQL, R, BASH, Cython, VBA), with much of my work being done in Python. I have further developed the ability to work and study independently, due to online learning in lockdown and having to study from home for my GCSEs. I also self-taught myself GCSE “Computer Science” as my school didn’t offer it as an option.

I am currently studying four A-Levels, one of which is Further Maths. The core reason I chose Further Maths is because I am interested in Decision Mathematics and the functionality of algorithms, especially their applications in programming. The secondary reason is that I am interested in mapping and path-finding software. 
</pre>
`

var ramtest_statement = `
<div class="nicetext">
RAMtest program v1.5 <br/>
Copyright 2022 James Blackburn <br/>
<br/>
Memory size detected = 512K <br/>
(If this is correct, how are you running your browser?) <br/>
<br/>
<table class="ramtest">
<tr>
  <th>TEST</th>
  <th>BLOCK</th>
  <th>EXPECT</th>
  <th>WRITING</th>
</tr>
<tr>
  <td id="ram_test"></td>
  <td id="ram_block"></td>
  <td id="ram_expect"></td>
  <td id="ram_WRITING"></td>
</tr>
</table> 
</div>
`

var nameBuffer = '';
var runningRamTest = false;

function draw() {
    $('#text').text( nameBuffer);
    $('#text').focus();
}

function execute() {
    var command = nameBuffer.trim();
    console.log(command);
    console.log(nameBuffer);
    $(`<div>&gt;&gt;&gt;${command}</div>`).insertBefore("#input-line");
    if (command == 'HELP') {
        $(`<div>${helpFile}</div>`).insertBefore("#input-line");
    } else if (command == 'LIST LEVEL2') {
        $(`<div>${level2_table}</div>`).insertBefore("#input-line");
    } else if (command == 'LIST EXTRACURRICULAR') {
        $(`<div>${extracurric_table}</div>`).insertBefore("#input-line");
    } else if (command == 'LIST') {
        $(`<div class="error">LIST COMMAND REQUIRES ARGUMENT: [data]<br/>${helpFile}</div>`).insertBefore("#input-line");
    } else if (command == 'PERSONALSTATEMENT') {
        $(`<div>${personal_statement}</div>`).insertBefore("#input-line");
    }  else if (command == 'RAMTEST.COM') {
        if (!runningRamTest) {
            runningRamTest = true;
            $(`<div>${ramtest_statement}</div>`).insertBefore("#input-line");
            var i = 0;
            var intervalId3 = setInterval(function(){
                i++;
                $('#ram_test').text('SIMPLE W/R');
                $('#ram_block').text('#'+i.toString(16));
                if (Math.round(Math.random()) == 1) {
                    $('#ram_expect').text('11111111');
                    $('#ram_WRITING').text('00000000');
                } else {
                    $('#ram_expect').text('00001111');
                    $('#ram_WRITING').text('11110000');
                }
                
                if (i == 64) {
                    runningRamTest = false;
                    clearInterval(intervalId3);
                }
            }, 500);
        } else {
            $(`<div>PROGRAM ALREADY RUNNING</div>`).insertBefore("#input-line");
        }
    }
    nameBuffer = '';
    window.scrollTo(0,document.body.scrollHeight);
}
function tab_completion() {
    var command = nameBuffer.trim();
    if (command.startsWith('LIST')) {
        l2 = 'LIST LEVEL2';
        extracurric = 'LIST EXTRACURRICULAR';
        if (l2.includes(command)) {
            nameBuffer = l2;
        } else if (extracurric.includes(command)) {
            nameBuffer = extracurric;
        }
    } else if ('PERSONALSTATEMENT'.includes(command)) {
         nameBuffer = 'PERSONALSTATEMENT';
    } else if ('RAMTEST.COM'.includes(command)) {
        nameBuffer = 'RAMTEST.COM';
   }
    draw();
}

$(document).ready(function() {
  
    $(document).keydown(function(e) {
      var keycode = parseInt(e.which);
      console.log(keycode);
      
      //delete or backspace
      if (keycode == 46 || keycode == 8) {
        event.preventDefault(); //prevent back navigation from backspace
        nameBuffer = nameBuffer.slice(0,nameBuffer.length-1);
        draw();
      } else if (keycode == 13) {
          execute();
      } else if (keycode == 9 || keycode == 16) {
          tab_completion();
      } 
    });
    $(document).keypress(function(e) {
      var keycode = parseInt(e.which);
      if (nameBuffer.length < 500)
      {
        nameBuffer += String.fromCharCode(keycode).toUpperCase();
      }
      draw();
    });
    
});
var intervalId = window.setInterval(function(){
    if ($('#cursor').text() == '') {
        $('#cursor').text('I')
    } else {
        $('#cursor').text('')
    }
}, 500);

$('#text').addEventListener("transitionend", e => {
    $('#text').focus();
  });

draw();