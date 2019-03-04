const DEFAULT_NEW_TAB_NAME = 'New Tab';
const GUITAR_STANDARD_E = ['e','B','G','D','A','E'];
const PPI = 150;
export const NOTE = {width:20,height:18};
/**
 * 0 or more strings being played on a given mesasure:
 * @property strings {string[]} The set of all strings on the instrument being played and their position / accenture etc
 */
export class Chord {
  constructor(...args:any[]) {
    var chord = { strings: [] };
    args.forEach((arg, n)=>{
      switch(typeof arg) {
        case 'object':
          if (arg instanceof Chord || arg.strings instanceof Array)
            chord.strings = arg.strings.slice(0);
          else if (arg instanceof Array)
            chord.strings = arg.slice(0).map(s=>s.toString());
          else throw new Error(`unreadable chord arguments: ${args}`);
          break;
        case 'string':
        case 'number':
          chord.strings[n] = arg.toString();
          break;
        default:
          chord.strings[n] = '';
          break;
      }
    })
    this.strings = chord.strings;
  }
  /** A normal guitar should *always* reflect `strings.length` of 6 i.e. */
  strings:string[];
  superImpose(chord:Chord) {
    chord.strings.forEach((string, index)=>{
      if (chord.strings[index]) this.strings[index] = chord.strings[index];
    })
  }
}
/**
 * 0 or more meaasures of 0 or more strings being played
 * @property notes {Chord[]} The set of all strings and positions in a sequence that may or may not be a song
 */
export class Tablature {
  notes: Chord[] = [];
}
export class TablatureCursor {
  note: number = 0;
  string: number = 0;
  measure: number = 0;
}
export class TablatureView {
  focused = {
    tab:false,
    name:false,
    sections:{}
  };
  name: string = DEFAULT_NEW_TAB_NAME;
  cursor: TablatureCursor = new TablatureCursor();
  tablature: Tablature = new Tablature();
  tuning: string[] = TablatureView.options.tunings.standard;
  page = {
    units:TablatureView.options.page.units.px,
    width:TablatureView.options.page.width.px,
    height:TablatureView.options.page.height.px,
    notesPerLine:0
  }
  note = {
    width: NOTE.width,
    height: NOTE.height
  };
  font = {
    size:'10pt'
  };
  strings = {
    labels : TablatureView.options.strings.labels.tab,
    offset: `${NOTE.height / 2}${this.page.units}`
  };
  signature = TablatureView.signature(4, 4);
  frets = 22;
  blankMeasure() {
    for (var n = 0; n < this.signature.notes; n++)
      this.notate('');
    this.cursor.note -= (this.signature.notes);
  }
  clear() {
    this.tablature.notes[this.cursor.note].strings[this.cursor.string] = '';
  }
  notate(...args:any[]) {
    var skipStrings = 0;
    if (args instanceof Array)
        while(skipStrings < this.cursor.string) {
            args.unshift('');
            skipStrings++;
        }
    console.info(`🎶 Recording tablature input: ${args?JSON.stringify(args):args}`);
    //console.info(args);
    var chord = new Chord(args), previous = this.tablature.notes[this.cursor.note-1], inMeasure = this.cursor.note-(this.signature.notes * this.cursor.measure);
    // Move to the right in the tab (increase note)
    //this.cursor.note = this.tablature.notes.length;
    // Maybe move to the last string with input
    if (isNaN(this.cursor.string))
        this.cursor.string = previous?previous.strings.findIndex(s=>!!s):0;
    console.info(`✍🏻 Note ${this.cursor.note} (${inMeasure + 1} / ${this.signature.notes})`)
    if (!this.tablature.notes[this.cursor.note]) this.tablature.notes.push(chord);
    this.tablature.notes[this.cursor.note].superImpose(chord);

    this.cursor.note ++;
  }
  static options = {
    tunings: {
      standard:GUITAR_STANDARD_E
    },
    strings : {
      labels : {
        tuning : 'tuning',
        number : 'number',
        tab:'tab'
      }
    },
    page:{
      units:{
        'px':'px',
        'in':'in'
      },
      width:{
        'px':7.5*PPI,
        'in':8.5
      },
      height:{
        'px':10*PPI,
        'in':11
      }
    }
  };
  static signature(beats, perMeasure) {
    return {
      beats:beats,
      notes:beats * perMeasure
    }
  }
}