##### **NovelOutlineTool\_v1.html**



|<div<br />      class="planning-picker"<br />      id="planningPicker"><br /></div|<div<br />      class="structure-picker"<br />      id="structurePicker"><br /></div>  |
|-|-|
|<div<br />      class="planbeats"<br />      id="planbeatsList"><br /></div>|<div<br />      class="beats"<br />      id="beatsList"><br /></div>|



&#x20; 





##### **NovelOutliner.js** 



**const PLANNING and const STRUCTURES define the types, ie, snowflake and then three-act** 









function createDefaultState()

|planingKey:"snowflake",		  <br />	<br />**planbeats:<br />**      PLANNING\["snowflake"].planbeats.map(<br />        z => ({<br />          name:z\[0],<br />          text:z\[1]<br />        })<br />      ),|structureKey:"three-act",<br /><br />**beats:<br />**      STRUCTURES\["three-act"].beats.map(<br />        b => ({<br />          name:b\[0],<br />          text:b\[1]<br />        })<br />      ),|
|-|-|
|then characters and chapters ||



##### 



function normaliseState(data)

|booktitle<br />genre<br />premise| |
|-|-|
| if(<br />    typeof data.planningKey === "string" \&\&<br />    PLANNING\[data.planningKey]<br />  ){<br />    clean.planningKey = data.planningKey;<br />  }|  if(<br />    typeof data.structureKey === "string" \&\&<br />    STRUCTURES\[data.structureKey]<br />  ){<br />    clean.structureKey = data.structureKey;<br />  }|
|/\* --- <br />   --- load PLANNING planbeats data <br />   --- \*/<br />  if(Array.isArray(data.planbeats)){<br /><br />    clean.planbeats = data.planbeats.map(planbeat => ({<br /><br />      name:<br />        typeof planbeat.name === "string"<br />          ? planbeat.name<br />          : "",<br /><br />      text:<br />        typeof planbeat.text === "string"<br />          ? planbeat.text<br />          : ""<br />    }));<br />  }|/\* --- <br />   --- load STRUCTURE beats data <br />   --- \*/<br />  if(Array.isArray(data.beats)){<br /><br />    clean.beats = data.beats.map(beat => ({<br /><br />      name:<br />        typeof beat.name === "string"<br />          ? beat.name<br />          : "",<br /><br />      text:<br />        typeof beat.text === "string"<br />          ? beat.text<br />          : ""<br />    }));<br />  }|











|function renderPlanningPicker()|function renderStructurePicker()|
|-|-|
|function renderPlanningPicker()<br />  const wrap =<br />    document.getElementById(<br />      "planningPicker"<br />    );<br />  wrap.innerHTML = "";<br />  Object.keys(PLANNING).forEach(key => {<br />    const button =<br />      document.createElement("button");<br />    button.type = "button";<br /><br />    button.textContent =<br />      PLANNING\[key].label;<br /><br />    if(key === state.planningKey){<br />      button.classList.add("active");<br />    }<br />    button.onclick = () => {<br />      state.planningKey = key;<br />      state.planbeats =<br />        PLANNING\[key].planbeats.map(<br />          x => ({<br />            name:x\[0],<br />            text:""<br />          })<br />        );<br />      render();<br />      queueSave();<br />    };<br />    wrap.appendChild(button);<br />  });<br />}|function renderStructurePicker()<br /> const wrap =<br />    document.getElementById(<br />      "structurePicker"<br />    );<br />  wrap.innerHTML = "";<br />  Object.keys(STRUCTURES).forEach(key => {<br />    const button =<br />      document.createElement("button");<br />    button.type = "button";<br /><br />    button.textContent =<br />      STRUCTURES\[key].label;<br /><br />    if(key === state.structureKey){<br />      button.classList.add("active");<br />    }<br />    button.onclick = () => {<br />      state.structureKey = key;<br />      state.beats =<br />        STRUCTURES\[key].beats.map(<br />          x => ({<br />            name:x\[0],<br />            text:""<br />          })<br />        );<br />      render();<br />      queueSave();<br />    };<br />    wrap.appendChild(button);<br />  });<br />}|
||function renderBeats(){|









&#x20;createDefaultState(){

&#x20; structureKey:"three-act",

&#x20;   beats:

&#x20;     STRUCTURES\["three-act"].beats.map(

&#x20;       b => ({

&#x20;         name:b\[0],

&#x20;         text:b\[1]

&#x20;       })

&#x20;     ),



&#x09;planningKey:"snowflake",		  

&#x09;planbeats:

&#x20;     PLANNING\["snowflake"].planbeats.map(

&#x20;       j => ({

&#x20;         name:j\[0],

&#x20;         text:j\[1]

&#x20;       })

&#x20;     ),







&#x20;  /\*\*\* 

&#x20;   \*\*\* Planning  

&#x20;   \*\*\*/



&#x20; .plan-picker{

&#x20;   display:flex;

&#x20;   gap:8px;

&#x20;   flex-wrap:wrap;

&#x20;   margin-bottom:18px;

&#x20; }



&#x20; .plan-picker button{

&#x20;   font-family:'JetBrains Mono', monospace;

&#x20;   font-size:11.5px;

&#x20;   letter-spacing:.03em;

&#x20;   padding:8px 13px;

&#x20;   border-radius:20px;

&#x20;   border:1px solid var(--line);

&#x20;   background:var(--paper-raised);

&#x20;   color:var(--ink-soft);

&#x20;   cursor:pointer;

&#x20; }



&#x20; .paln-picker button.active{

&#x20;   background:var(--ink);

&#x20;   color:var(--paper-raised);

&#x20;   border-color:var(--ink);

&#x20; }



&#x20; .planbeats{

&#x20;   display:flex;

&#x20;   flex-direction:column;

&#x20;   gap:10px;

&#x20; }



&#x20; .planbeat{

&#x20;   display:grid;

&#x20;   grid-template-columns:150px 1fr;

&#x20;   gap:14px;

&#x20;   background:var(--paper-raised);

&#x20;   border:1px solid var(--line-soft);

&#x20;   border-radius:4px;

&#x20;   padding:12px 14px;

&#x20;   box-shadow:var(--shadow);

&#x20; }



&#x20; .planbeat .planbeat-name{

&#x20;   font-family:'Fraunces', serif;

&#x20;   font-weight:600;

&#x20;   font-size:14.5px;

&#x20;   padding-top:4px;

&#x20;   color:var(--accent);

&#x20; }



&#x20; .planbeat textarea{

&#x20;   min-height:46px;

&#x20;   background:transparent;

&#x20;   border:none;

&#x20;   padding:4px 0;

&#x20; }



&#x20; .planbeat textarea:focus{

&#x20;   background:rgba(255,255,255,0.4);

&#x20; }



















