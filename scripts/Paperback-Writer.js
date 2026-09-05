/* =========================================================
   STORY STRUCTURES
   ========================================================= */

const STRUCTURES = {
  "three-act": {
    label:"Three-Act",
	helpText:"Classic storytelling template split into Setup, Confrontation, and Resolution.", 
    beats:[
      ["Setup",""],
      ["Inciting Incident",""],
      ["Plot Point 1 — into Act 2",""],
      ["Rising Action / midpoint shift",""],
      ["Plot Point 2 — into Act 3",""],
      ["Climax",""],
      ["Resolution",""]
    ]
  },

  "heros-journey": {
    label:"Hero's Journey",
	helpText:"A 12-stage mythological cycle tracking a hero's departure and transformation.", 
    beats:[
      ["Ordinary World",""],
      ["Call to Adventure",""],
      ["Refusal of the Call",""],
      ["Meeting the Mentor",""],
      ["Crossing the Threshold",""],
      ["Tests, Allies, Enemies",""],
      ["Approach to the Inmost Cave",""],
      ["Ordeal",""],
      ["Reward",""],
      ["The Road Back",""],
      ["Resurrection",""],
      ["Return with the Elixir",""]
    ]
  },

  "save-the-cat": {
    label:"Save the Cat",
	helpText:"needs update.",
    beats:[
      ["Opening Image",""],
      ["Theme Stated",""],
      ["Set-Up",""],
      ["Catalyst",""],
      ["Debate",""],
      ["Break into Two",""],
      ["B Story",""],
      ["Fun and Games",""],
      ["Midpoint",""],
      ["Bad Guys Close In",""],
      ["All Is Lost",""],
      ["Dark Night of the Soul",""],
      ["Break into Three",""],
      ["Finale",""],
      ["Final Image",""]
    ]
  },
  
    "dialectical": {
    label:"Dialectical",
	helpText:"Often combined with multidisciplinary inquiry (the process) & Dialectical Structure.",
    beats:[
      ["Introduction",""],
      ["Body Part 1: Thesis",""],
      ["Body Part 2: Antithesis",""],
      ["Body Part 3: Synthesis", ""],
      ["Conclusion",""]
    ]
  },
  
};


/* =========================================================
   STORY PLANNING
   ========================================================= */
const PLANNING = {
  "snowflake": {
    label:"Snowflake (5-sentence)",
	helpText:"A top-down approach: Start with a 1-sentence summary, expand it to a full page, then build character profiles and scene lists step-by-step.",
    planbeats:[
      ["Sentence 1 — the whole story",""],
      ["Sentence 2 — disaster 1 / Act 2 turn",""],
      ["Sentence 3 — disaster 2 / midpoint",""],
      ["Sentence 4 — disaster 3 / low point",""],
      ["Sentence 5 — the ending",""]
    ]
  },

  "freytag": {
    label:"Freytag's Pyramid",
	helpText:"A 5-part dramatic arc focusing on standard tragic or dramatic progression: Introduction, Rising Action, Climax, Falling Action, and Catastrophe/Resolution.",
    planbeats:[
      ["Exposition",""],
      ["Rising Action",""],
      ["Climax",""],
      ["Falling Action",""],
      ["Denouement",""]
    ]
  },

  "multidiscplinary": {
    label:"Multidiscplinary Inquiry",
	helpText:"Integrates strategies from multiple writing frameworks, genres, or fields (e.g., combining thematic mapping, character psychology, and classic pacing charts).",
    planbeats:[
      ["1. Define the core problem",""],
      ["2. Map and select revevant disciplines",""],
      ["3. Gather data separately",""],
      ["4. Identify intersections and conficts",""],
      ["5. Synthesize the findings",""],
	  ["6. Synthesize the findings",""]
    ]
  }


};


/* =========================================================
   DEFAULT STATE
   ========================================================= */

function createDefaultState(){

  return {

    bookTitle:"",
    genre:"",
    premise:"",

    structureKey:"three-act",
    beats:
      STRUCTURES["three-act"].beats.map(
        b => ({
          name:b[0],
          text:b[1]
        })
      ),

	planningKey:"snowflake",		  
	planbeats:
      PLANNING["snowflake"].planbeats.map(
        j => ({
          name:j[0],
          text:j[1]
        })
      ),


    characters:[
      {
        name:"",
        role:"Protagonist",
        want:"",
        wound:""
      }
    ],

    chapters:[
      {
        title:"",
        pov:"",
        words:"",
        summary:""
      }
    ]
  };
}


let state = createDefaultState();
let saveTimer = null;


/* =========================================================
   STATE VALIDATION
   ========================================================= */

function normaliseState(data){

  const clean = createDefaultState();

  if(!data || typeof data !== "object"){
    return clean;
  }


  if(typeof data.bookTitle === "string"){
    clean.bookTitle = data.bookTitle;
  }

  if(typeof data.genre === "string"){
    clean.genre = data.genre;
  }

  if(typeof data.premise === "string"){
    clean.premise = data.premise;
  }

  if(
    typeof data.structureKey === "string" &&
    STRUCTURES[data.structureKey]
  ){
    clean.structureKey = data.structureKey;
  }

 if(
    typeof data.planningKey === "string" &&
    PLANNING[data.planningKey]
  ){
    clean.planningKey = data.planningKey;
  }


/* --- 
   --- load STRUCTURE beats data 
   --- */
  if(Array.isArray(data.beats)){
    clean.beats = data.beats.map(beat => ({
      name:
        typeof beat.name === "string"
          ? beat.name
          : "",

      text:
        typeof beat.text === "string"
          ? beat.text
          : ""
    }));
  }


/* --- 
   --- load PLANNING planbeats data 
   --- */
  if(Array.isArray(data.planbeats)){
    clean.planbeats = data.planbeats.map(planbeat => ({
      name:
        typeof planbeat.name === "string"
          ? planbeat.name
          : "",

      text:
        typeof planbeat.text === "string"
          ? planbeat.text
          : ""

    }));
  }



/* --- 
   --- load character data 
   --- */
  if(Array.isArray(data.characters)){

    clean.characters = data.characters.map(character => ({

      name:
        typeof character.name === "string"
          ? character.name
          : "",
      role:
        typeof character.role === "string"
          ? character.role
          : "",
      want:
        typeof character.want === "string"
          ? character.want
          : "",
      wound:
        typeof character.wound === "string"
          ? character.wound
          : ""

    }));
  }

/* --- 
   --- load chapters data 
   --- */

  if(Array.isArray(data.chapters)){

    clean.chapters = data.chapters.map(chapter => ({

      title:
        typeof chapter.title === "string"
          ? chapter.title
          : "",

      pov:
        typeof chapter.pov === "string"
          ? chapter.pov
          : "",

      words:
        typeof chapter.words === "string"
          ? chapter.words
          : String(chapter.words || ""),

      summary:
        typeof chapter.summary === "string"
          ? chapter.summary
          : ""

    }));

  }


  return clean;

} /* --- end of normaliseState function */


/* =========================================================
   FILE DOWNLOAD HELPER
   ========================================================= */

function downloadBlob(blob, filename){

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();
  link.remove();
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}


/* =========================================================
   LOAD PROJECT
   ========================================================= */

function loadProjectFile(file){

  if(!file){
    return;
  }


  const reader = new FileReader();


  reader.onload = function(){

    try{
      const parsed =
        JSON.parse(reader.result);
      state = normaliseState(parsed);
      render();
      setSaveStatus(
        "project loaded",
        true
      );
      showToast("Project loaded");
    }

    catch(error){

      console.error(
        "Could not load project:",
        error
      );


      alert(
        "That file could not be loaded as a valid novel outline."
      );

    }

  };


  reader.onerror = function(){

    alert(
      "The project file could not be read."
    );

  };


  reader.readAsText(file);

}

/* =========================================================
   SAVE PROJECT
   ========================================================= */

function saveProject(){

  // Make sure the top-level fields are current.
  state.bookTitle =
    document.getElementById("bookTitle").value;
  state.genre =
    document.getElementById("genre").value;
  state.premise =
    document.getElementById("premise").value;

  clearTimeout(saveTimer);

  const json = JSON.stringify( state, null, 2);

/* this little trick writes the data to "file" in memeory */
  const blob = new Blob( [json], {type:"application/json;charset=utf-8"});

  let filename =
    (state.bookTitle || "novel-outline")
      .replace(/[^a-z0-9\-_ ]/gi,"")
      .trim();
  if(!filename){
    filename = "novel-outline";
  }

/* this little trick moves the "file" in memeory onto your computer */
  downloadBlob(
    blob,
    filename + ".json"
  );

  setSaveStatus("project saved", true);
  showToast("Project saved");

}




/* =========================================================
   SAVE HTML SNAPSHOT
   ========================================================= */

function saveLocalHTML(){

  // Make sure the current top-level fields are current.
  state.bookTitle =
    document.getElementById("bookTitle").value;

  state.genre =
    document.getElementById("genre").value;

  state.premise =
    document.getElementById("premise").value;


  clearTimeout(saveTimer);


  // Safely convert state to JSON.
  const savedState =
    JSON.stringify(state)
      .replace(/</g,"\\u003c")
      .replace(/>/g,"\\u003e")
      .replace(/&/g,"\\u0026");


  // Clone the current application.
  const html =
    document.documentElement.cloneNode(true);

  // Remove an existing embedded state.
  const oldState = html.querySelector("#embeddedSavedState");
  if(oldState){
    oldState.remove();
  }


  // Embed the project data.
  const stateScript =
    document.createElement("script");

  stateScript.id =
    "embeddedSavedState";

  stateScript.textContent =
    "window.embeddedSavedState = " +
    savedState +
    ";";

  html
    .querySelector("head")
    .appendChild(stateScript);

  const fullHTML =
    "<!DOCTYPE html>\n" +
    html.outerHTML;

  const blob =
    new Blob(
      [fullHTML],
      {
        type:"text/html;charset=utf-8"
      }
    );

  let filename =
    (state.bookTitle || "novel-outline")
      .replace(/[^a-z0-9\-_ ]/gi,"")
      .trim();

  if(!filename){filename = "novel-outline";}
  downloadBlob(blob, filename + ".html");
  setSaveStatus("HTML snapshot saved", true);
  showToast("HTML snapshot saved");
}


/* =========================================================
   STATUS
   ========================================================= */

function setSaveStatus(text, saved){

  const el =
    document.getElementById("saveState");

  el.textContent = text;

  if(saved){
    el.classList.add("saved");
  }
  else{
    el.classList.remove("saved");
  }

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(msg){

  const t =
    document.getElementById("toast");

  t.textContent = msg;

  t.classList.add("show");

  setTimeout(
    () => t.classList.remove("show"),
    1800
  );

}


/* =========================================================
   AUTOSAVE STATUS
   ========================================================= */

function queueSave(){

  setSaveStatus(
    "changes not yet saved",
    false
  );

  clearTimeout(saveTimer);

  saveTimer =
    setTimeout(
      () => {

        setSaveStatus(
          "changes ready to save",
          false
        );

      },
      500
    );

}


/* =========================================================
   STRUCTURE PICKER 
   ========================================================= */

function renderStructurePicker(){
    const wrap = document.getElementById("structurePicker");
    wrap.innerHTML = "";
	
    Object.keys(STRUCTURES).forEach(key => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = STRUCTURES[key].label;
        
		console.log("key:", key); 
		console.log("state.structureKey:", state.structureKey);
		
		button.title = STRUCTURES[key].helpText || "Click to use this writing structure";
        if(key === state.structureKey){
            button.classList.add("active");
        }
        button.onclick = () => {
            // ONLY reset data if they are choosing a DIFFERENT structure
            if (state.structureKey !== key) {
                state.structureKey = key;
                state.beats = STRUCTURES[key].beats.map( x => ({ name:x[0], text:"" }) );
                render();
                queueSave();
            }
        };
        wrap.appendChild(button);
    });
}

/* =========================================================
   PLANNING PICKER
   ========================================================= */

function renderPlanningPicker(){
    const wrap = document.getElementById("planningPicker");
    wrap.innerHTML = "";
    Object.keys(PLANNING).forEach(key => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = PLANNING[key].label;

		console.log("key:", key); 
		console.log("state.planningKey:", state.planningKey);
        
		button.title = PLANNING[key].helpText || "Click to use this writing structure";
        if(key === state.planningKey){
            button.classList.add("active");
        }       
        button.onclick = () => {
            // ONLY reset data if they are choosing a DIFFERENT planning outline
            if (state.planningKey !== key) {
                state.planningKey = key;
                state.planbeats = PLANNING[key].planbeats.map( x => ({ name:x[0], text:"" }) );
                render();
                queueSave();
            }
        };
        wrap.appendChild(button);
    });
}


/* =========================================================
   RENDER BEATS for STRUCTURES
   ========================================================= */

function renderBeats(){

  const wrap = document.getElementById("beatsList");
  wrap.innerHTML = "";
  state.beats.forEach(
    (beat, i) => {
      const row = document.createElement("div");
      row.className = "beat";
      const name = document.createElement("div");
      name.className = "beat-name";
      name.textContent = beat.name;
      const textarea = document.createElement("textarea");
      textarea.placeholder = "What happens here…";
      textarea.value = beat.text;
      textarea.addEventListener(
        "input",
        e => {
          state.beats[i].text =
            e.target.value;
          queueSave();
        }
      );
      row.appendChild(name);
      row.appendChild(textarea);
      wrap.appendChild(row);
    }
  );
}




/* =========================================================
   Render planBEATS for PLANNING 
   ========================================================= */

function renderPlanBeats(){

  const wrap = document.getElementById("planbeatsList");
  wrap.innerHTML = "";
  state.planbeats.forEach(
    (planbeat, i) => {
      const row = document.createElement("div");
      row.className = "beat";
      const name = document.createElement("div");
      name.className = "planbeat-name";
      name.textContent = planbeat.name;
      const textarea = document.createElement("textarea");
      textarea.placeholder = "What happens here…";
      textarea.value = planbeat.text;
      textarea.addEventListener(
        "input",
        e => {
          state.planbeats[i].text =
            e.target.value;
          queueSave();
        }
      );
      row.appendChild(name);
      row.appendChild(textarea);
      wrap.appendChild(row);

    }
  );
}



/* =========================================================
   CHARACTERS
   ========================================================= */

function renderCharacters(){

  const wrap =
    document.getElementById(
      "charGrid"
    );


  wrap.innerHTML = "";


  state.characters.forEach(
    (c, i) => {

      const card =
        document.createElement("div");


      card.className =
        "char-card";


      const remove =
        document.createElement("button");


      remove.className =
        "card-remove";


      remove.type = "button";

      remove.title = "remove";

      remove.textContent = "✕";


      remove.onclick = () => {

        state.characters.splice(i,1);

        render();

        queueSave();

      };


      card.appendChild(remove);


      const top =
        document.createElement("div");


      top.className =
        "char-row char-two";


      top.appendChild(
        makeCharacterField(
          "Name",
          "c-name",
          c.name,
          value => {
            state.characters[i].name = value;
            queueSave();
          },
          "Character name"
        )
      );


      top.appendChild(
        makeCharacterField(
          "Role",
          "c-role",
          c.role,
          value => {
            state.characters[i].role = value;
            queueSave();
          },
          "Protagonist / Antagonist / Ally…"
        )
      );


      card.appendChild(top);


      card.appendChild(
        makeCharacterField(
          "Wants",
          "c-want",
          c.want,
          value => {
            state.characters[i].want = value;
            queueSave();
          },
          "What they consciously want"
        )
      );


      card.appendChild(
        makeCharacterField(
          "Wound / need",
          "c-wound",
          c.wound,
          value => {
            state.characters[i].wound = value;
            queueSave();
          },
          "What they actually need to face"
        )
      );


      wrap.appendChild(card);

    }
  );

}


function makeCharacterField(
  labelText,
  className,
  value,
  onInput,
  placeholder
){

  const wrapper =
    document.createElement("div");


  wrapper.className =
    "char-row";


  const label =
    document.createElement("label");


  label.textContent =
    labelText;


  const input =
    document.createElement("input");


  input.className =
    className;


  input.placeholder =
    placeholder;


  input.value =
    value || "";


  input.addEventListener(
    "input",
    e => onInput(e.target.value)
  );


  wrapper.appendChild(label);

  wrapper.appendChild(input);


  return wrapper;

}


/* =========================================================
   CHAPTERS
   ========================================================= */

function renderChapters(){

  const wrap =
    document.getElementById(
      "chapterList"
    );


  wrap.innerHTML = "";


  state.chapters.forEach(
    (ch, i) => {

      const card =
        document.createElement("div");


      card.className =
        "chapter-card";


      const num =
        document.createElement("div");


      num.className =
        "chapter-num";


      num.textContent =
        String(i + 1).padStart(2,"0");


      card.appendChild(num);


      const content =
        document.createElement("div");


      const remove =
        document.createElement("button");


      remove.className =
        "card-remove";


      remove.type = "button";

      remove.title = "remove";

      remove.textContent = "✕";


      remove.onclick = () => {

        state.chapters.splice(i,1);

        render();

        queueSave();

      };


      content.appendChild(remove);


      const top =
        document.createElement("div");


      top.className =
        "chapter-top";


      const title =
        document.createElement("input");


      title.className =
        "ch-title";

      title.placeholder =
        "Chapter title";

      title.value =
        ch.title || "";


      const pov =
        document.createElement("input");


      pov.className =
        "ch-pov";

      pov.placeholder =
        "POV character";

      pov.value =
        ch.pov || "";


      const words =
        document.createElement("input");


      words.className =
        "ch-words";

      words.placeholder =
        "target words";

      words.value =
        ch.words || "";


      title.addEventListener(
        "input",
        e => {
          state.chapters[i].title =
            e.target.value;
          queueSave();
        }
      );


      pov.addEventListener(
        "input",
        e => {
          state.chapters[i].pov =
            e.target.value;
          queueSave();
        }
      );


      words.addEventListener(
        "input",
        e => {
          state.chapters[i].words =
            e.target.value;

          renderStats();

          queueSave();
        }
      );


      top.appendChild(title);
      top.appendChild(pov);
      top.appendChild(words);


      content.appendChild(top);


      const summary =
        document.createElement("textarea");


      summary.className =
        "chapter-summary ch-summary";


      summary.placeholder =
        "What happens in this chapter…";


      summary.value =
        ch.summary || "";


      summary.addEventListener(
        "input",
        e => {

          state.chapters[i].summary =
            e.target.value;

          queueSave();

        }
      );


      content.appendChild(summary);


      card.appendChild(content);


      wrap.appendChild(card);

    }
  );


  renderStats();

}


/* =========================================================
   CHAPTER STATS
   ========================================================= */

function renderStats(){

  const strip =
    document.getElementById(
      "chapterStats"
    );

  let totalWords = 0;

  state.chapters.forEach(
    ch => {

      if(
        ch.words &&
        !isNaN(parseInt(ch.words))
      ){

        totalWords +=
          parseInt(ch.words);
      }
    }
  );

  strip.innerHTML =
    `<span><b>${state.chapters.length}</b> chapters</span>` +
    `<span><b>${totalWords.toLocaleString()}</b> target words</span>`;
}


/* =========================================================
   RENDER
   ========================================================= */

function render(){

  document.getElementById(
    "bookTitle"
  ).value =
    state.bookTitle;


  document.getElementById(
    "genre"
  ).value =
    state.genre;


  document.getElementById(
    "premise"
  ).value =
    state.premise;


  renderStructurePicker();
  renderBeats();
  renderPlanningPicker();
  renderPlanBeats();

  renderCharacters();

  renderChapters();

}


/* =========================================================
   MARKDOWN EXPORT
   ========================================================= */

function buildMarkdown(){

  let md =
    `# ${state.bookTitle || "Untitled Novel"}\n\n`;


  if(state.genre){

    md +=
      `*${state.genre}*\n\n`;

  }


  if(state.premise){

    md +=
      `${state.premise}\n\n`;

  }


  md +=
    `---\n\n## Structure — ${STRUCTURES[state.structureKey].label}\n\n`;


  state.beats.forEach(
    b => {

      md +=
        `**${b.name}**  \n` +
        `${b.text || "_(not yet written)_"}\n\n`;

    }
  );


  md +=
    `---\n\n## Characters\n\n`;


  state.characters.forEach(
    c => {

      md +=
        `### ${c.name || "Unnamed"} ` +
        `${c.role ? "— " + c.role : ""}\n`;


      if(c.want){

        md +=
          `- Wants: ${c.want}\n`;

      }


      if(c.wound){

        md +=
          `- Wound / need: ${c.wound}\n`;

      }


      md += "\n";

    }
  );


  md +=
    `---\n\n## Chapters\n\n`;


  state.chapters.forEach(
    (ch, i) => {

      md +=
        `### Chapter ${i + 1}` +
        `${ch.title ? ": " + ch.title : ""}\n`;


      if(ch.pov){

        md +=
          `- POV: ${ch.pov}\n`;

      }


      if(ch.words){

        md +=
          `- Target words: ${ch.words}\n`;

      }


      if(ch.summary){

        md +=
          `\n${ch.summary}\n`;

      }


      md += "\n";

    }
  );


  return md;

}


/* =========================================================
   BUTTONS
   ========================================================= */

document.getElementById(
  "saveProjectBtn"
).onclick = saveProject;


document.getElementById(
  "loadProjectBtn"
).onclick = () => {

  document
    .getElementById("projectFileInput")
    .click();

};


document.getElementById(
  "projectFileInput"
).addEventListener(
  "change",
  event => {

    const file =
      event.target.files[0];


    if(file){

      loadProjectFile(file);

    }
    // Allow the same file to be selected again.
    event.target.value = "";

  }
);


document.getElementById(
  "saveHTMLBtn"
).onclick =
  saveLocalHTML;


/* =========================================================
   TOP-LEVEL INPUTS
   ========================================================= */

document.getElementById(
  "bookTitle"
).addEventListener(
  "input",
  e => {

    state.bookTitle =
      e.target.value;

    queueSave();

  }
);


document.getElementById(
  "genre"
).addEventListener(
  "input",
  e => {

    state.genre =
      e.target.value;

    queueSave();

  }
);


document.getElementById(
  "premise"
).addEventListener(
  "input",
  e => {

    state.premise =
      e.target.value;

    queueSave();

  }
);


/* =========================================================
   ADD CHARACTER
   ========================================================= */

document.getElementById(
  "addChar"
).onclick = () => {

  state.characters.push({

    name:"",
    role:"",
    want:"",
    wound:""

  });


  render();

  queueSave();

};


/* =========================================================
   ADD CHAPTER
   ========================================================= */

document.getElementById(
  "addChapter"
).onclick = () => {

  state.chapters.push({

    title:"",
    pov:"",
    words:"",
    summary:""

  });


  render();

  queueSave();


  document
    .getElementById("chapterList")
    .lastElementChild
    .scrollIntoView({
      behavior:"smooth",
      block:"center"
    });

};


/* =========================================================
   MARKDOWN DOWNLOAD
   ========================================================= */

document.getElementById(
  "downloadBtn"
).onclick = () => {

  const md =
    buildMarkdown();


  const blob =
    new Blob(
      [md],
      {
        type:"text/markdown;charset=utf-8"
      }
    );


  let filename =
    (state.bookTitle || "outline")
      .replace(/[^a-z0-9\-_ ]/gi,"")
      .trim();


  if(!filename){
    filename = "outline";
  }


  downloadBlob(
    blob,
    filename + ".md"
  );


  showToast(
    "Markdown downloaded"
  );

};


/* =========================================================
   COPY TO CLIPBOARD
   ========================================================= */

document.getElementById(
  "copyBtn"
).onclick = async () => {

  const md =
    buildMarkdown();


  try{

    await navigator.clipboard.writeText(md);

    showToast(
      "Copied to clipboard"
    );

  }

  catch(e){

    showToast(
      "Copy failed — select and copy manually"
    );

  }

};


/* =========================================================
   RESET
   ========================================================= */

document.getElementById(
  "resetBtn"
).onclick = () => {

  if(
    !confirm(
      "Clear the whole outline? This cannot be undone."
    )
  ){
    return;
  }

  state = createDefaultState();
  render();

  setSaveStatus(
    "cleared — save project when ready",
    false
  );
  showToast(
    "Cleared"
  );
};


/* =========================================================
   INITIAL LOAD
   ========================================================= */
function initialise(){

  // If this HTML file was previously saved using
  // "Save HTML", it may contain an embedded project.
  if(window.embeddedSavedState){

    state = normaliseState( window.embeddedSavedState );
    setSaveStatus(
      "saved project loaded",
      true
    );
  }
  render();

}


initialise();