import { Hasher } from './hasher';
import { FilePiece } from './filePiece';
import { Chunk } from './chunk';

interface HasherWorker {
  readonly worker: Worker;
  activeJobs: number;
}

type ResolveType = (chunk: Chunk) => void;
type RejectType = (error: Error) => void;

interface Job {
  readonly filePiece: FilePiece;
  readonly resolve: ResolveType;
  readonly reject: RejectType;
}

const rushaWorkerInline = '(function(){var a={getDataType:function(a){if(typeof a==="string"){return"string"}if(a instanceof Array){return"array"}if(typeof global!=="undefined"&&global.Buffer&&global.Buffer.isBuffer(a)){return"buffer"}if(a instanceof ArrayBuffer){return"arraybuffer"}if(a.buffer instanceof ArrayBuffer){return"view"}if(a instanceof Blob){return"blob"}throw new Error("Unsupported data type.")}};function b(d){"use strict";var e={fill:0};var f=function(a){for(a+=9;a%64>0;a+=1);return a};var g=function(a,b){var c=new Uint8Array(a.buffer);var d=b%4,e=b-d;switch(d){case 0:c[e+3]=0;case 1:c[e+2]=0;case 2:c[e+1]=0;case 3:c[e+0]=0}for(var f=(b>>2)+1;f<a.length;f++)a[f]=0};var h=function(a,b,c){a[b>>2]|=128<<24-(b%4<<3);a[((b>>2)+2&~15)+14]=c/(1<<29)|0;a[((b>>2)+2&~15)+15]=c<<3};var i=function(a,b,c,d,e){var f=this,g,h=e%4,i=(d+h)%4,j=d-i;switch(h){case 0:a[e]=f.charCodeAt(c+3);case 1:a[e+1-(h<<1)|0]=f.charCodeAt(c+2);case 2:a[e+2-(h<<1)|0]=f.charCodeAt(c+1);case 3:a[e+3-(h<<1)|0]=f.charCodeAt(c)}if(d<i+h){return}for(g=4-h;g<j;g=g+4|0){b[e+g>>2]=f.charCodeAt(c+g)<<24|f.charCodeAt(c+g+1)<<16|f.charCodeAt(c+g+2)<<8|f.charCodeAt(c+g+3)}switch(i){case 3:a[e+j+1|0]=f.charCodeAt(c+j+2);case 2:a[e+j+2|0]=f.charCodeAt(c+j+1);case 1:a[e+j+3|0]=f.charCodeAt(c+j)}};var j=function(a,b,c,d,e){var f=this,g,h=e%4,i=(d+h)%4,j=d-i;switch(h){case 0:a[e]=f[c+3];case 1:a[e+1-(h<<1)|0]=f[c+2];case 2:a[e+2-(h<<1)|0]=f[c+1];case 3:a[e+3-(h<<1)|0]=f[c]}if(d<i+h){return}for(g=4-h;g<j;g=g+4|0){b[e+g>>2|0]=f[c+g]<<24|f[c+g+1]<<16|f[c+g+2]<<8|f[c+g+3]}switch(i){case 3:a[e+j+1|0]=f[c+j+2];case 2:a[e+j+2|0]=f[c+j+1];case 1:a[e+j+3|0]=f[c+j]}};var k=function(a,b,d,e,f){var g=this,h,i=f%4,j=(e+i)%4,k=e-j;var l=new Uint8Array(c.readAsArrayBuffer(g.slice(d,d+e)));switch(i){case 0:a[f]=l[3];case 1:a[f+1-(i<<1)|0]=l[2];case 2:a[f+2-(i<<1)|0]=l[1];case 3:a[f+3-(i<<1)|0]=l[0]}if(e<j+i){return}for(h=4-i;h<k;h=h+4|0){b[f+h>>2|0]=l[h]<<24|l[h+1]<<16|l[h+2]<<8|l[h+3]}switch(j){case 3:a[f+k+1|0]=l[k+2];case 2:a[f+k+2|0]=l[k+1];case 1:a[f+k+3|0]=l[k]}};var l=function(b){switch(a.getDataType(b)){case"string":return i.bind(b);case"array":return j.bind(b);case"buffer":return j.bind(b);case"arraybuffer":return j.bind(new Uint8Array(b));case"view":return j.bind(new Uint8Array(b.buffer,b.byteOffset,b.byteLength));case"blob":return k.bind(b)}};var m=function(b,c){switch(a.getDataType(b)){case"string":return b.slice(c);case"array":return b.slice(c);case"buffer":return b.slice(c);case"arraybuffer":return b.slice(c);case"view":return b.buffer.slice(c)}};var n=new Array(256);for(var o=0;o<256;o++){n[o]=(o<16?"0":"")+o.toString(16)}var p=function(a){var b=new Uint8Array(a);var c=new Array(a.byteLength);for(var d=0;d<c.length;d++){c[d]=n[b[d]]}return c.join("")};var q=function(a){var b;if(a<=65536)return 65536;if(a<16777216){for(b=1;b<a;b=b<<1);}else{for(b=16777216;b<a;b+=16777216);}return b};var r=function(a){if(a%64>0){throw new Error("Chunk size must be a multiple of 128 bit")}e.offset=0;e.maxChunkLen=a;e.padMaxChunkLen=f(a);e.heap=new ArrayBuffer(q(e.padMaxChunkLen+320+20));e.h32=new Int32Array(e.heap);e.h8=new Int8Array(e.heap);e.core=new b._core({Int32Array:Int32Array,DataView:DataView},{},e.heap);e.buffer=null};r(d||64*1024);var s=function(a,b){e.offset=0;var c=new Int32Array(a,b+320,5);c[0]=1732584193;c[1]=-271733879;c[2]=-1732584194;c[3]=271733878;c[4]=-1009589776};var t=function(a,b){var c=f(a);var d=new Int32Array(e.heap,0,c>>2);g(d,a);h(d,a,b);return c};var u=function(a,b,c,d){l(a)(e.h8,e.h32,b,c,d||0)};var v=function(a,b,c,d,f){var g=c;u(a,b,c);if(f){g=t(c,d)}e.core.hash(g,e.padMaxChunkLen)};var w=function(a,b){var c=new Int32Array(a,b+320,5);var d=new Int32Array(5);var e=new DataView(d.buffer);e.setInt32(0,c[0],false);e.setInt32(4,c[1],false);e.setInt32(8,c[2],false);e.setInt32(12,c[3],false);e.setInt32(16,c[4],false);return d};var x=this.rawDigest=function(a){var b=a.byteLength||a.length||a.size||0;s(e.heap,e.padMaxChunkLen);var c=0,d=e.maxChunkLen;for(c=0;b>c+d;c+=d){v(a,c,d,b,false)}v(a,c,b-c,b,true);return w(e.heap,e.padMaxChunkLen)};this.digest=this.digestFromString=this.digestFromBuffer=this.digestFromArrayBuffer=function(a){return p(x(a).buffer)};this.resetState=function(){s(e.heap,e.padMaxChunkLen);return this};this.append=function(a){var b=0;var c=a.byteLength||a.length||a.size||0;var d=e.offset%e.maxChunkLen;var f;e.offset+=c;while(b<c){f=Math.min(c-b,e.maxChunkLen-d);u(a,b,f,d);d+=f;b+=f;if(d===e.maxChunkLen){e.core.hash(e.maxChunkLen,e.padMaxChunkLen);d=0}}return this};this.getState=function(){var a=e.offset%e.maxChunkLen;var b;if(!a){var c=new Int32Array(e.heap,e.padMaxChunkLen+320,5);b=c.buffer.slice(c.byteOffset,c.byteOffset+c.byteLength)}else{b=e.heap.slice(0)}return{offset:e.offset,heap:b}};this.setState=function(a){e.offset=a.offset;if(a.heap.byteLength===20){var b=new Int32Array(e.heap,e.padMaxChunkLen+320,5);b.set(new Int32Array(a.heap))}else{e.h32.set(new Int32Array(a.heap))}return this};var y=this.rawEnd=function(){var a=e.offset;var b=a%e.maxChunkLen;var c=t(b,a);e.core.hash(c,e.padMaxChunkLen);var d=w(e.heap,e.padMaxChunkLen);s(e.heap,e.padMaxChunkLen);return d};this.end=function(){return p(y().buffer)}}b._core=function a(b,c,d){"use asm";var e=new b.Int32Array(d);function f(a,b){a=a|0;b=b|0;var c=0,d=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;f=e[b+320>>2]|0;h=e[b+324>>2]|0;j=e[b+328>>2]|0;l=e[b+332>>2]|0;n=e[b+336>>2]|0;for(c=0;(c|0)<(a|0);c=c+64|0){g=f;i=h;k=j;m=l;o=n;for(d=0;(d|0)<64;d=d+4|0){q=e[c+d>>2]|0;p=((f<<5|f>>>27)+(h&j|~h&l)|0)+((q+n|0)+1518500249|0)|0;n=l;l=j;j=h<<30|h>>>2;h=f;f=p;e[a+d>>2]=q}for(d=a+64|0;(d|0)<(a+80|0);d=d+4|0){q=(e[d-12>>2]^e[d-32>>2]^e[d-56>>2]^e[d-64>>2])<<1|(e[d-12>>2]^e[d-32>>2]^e[d-56>>2]^e[d-64>>2])>>>31;p=((f<<5|f>>>27)+(h&j|~h&l)|0)+((q+n|0)+1518500249|0)|0;n=l;l=j;j=h<<30|h>>>2;h=f;f=p;e[d>>2]=q}for(d=a+80|0;(d|0)<(a+160|0);d=d+4|0){q=(e[d-12>>2]^e[d-32>>2]^e[d-56>>2]^e[d-64>>2])<<1|(e[d-12>>2]^e[d-32>>2]^e[d-56>>2]^e[d-64>>2])>>>31;p=((f<<5|f>>>27)+(h^j^l)|0)+((q+n|0)+1859775393|0)|0;n=l;l=j;j=h<<30|h>>>2;h=f;f=p;e[d>>2]=q}for(d=a+160|0;(d|0)<(a+240|0);d=d+4|0){q=(e[d-12>>2]^e[d-32>>2]^e[d-56>>2]^e[d-64>>2])<<1|(e[d-12>>2]^e[d-32>>2]^e[d-56>>2]^e[d-64>>2])>>>31;p=((f<<5|f>>>27)+(h&j|h&l|j&l)|0)+((q+n|0)-1894007588|0)|0;n=l;l=j;j=h<<30|h>>>2;h=f;f=p;e[d>>2]=q}for(d=a+240|0;(d|0)<(a+320|0);d=d+4|0){q=(e[d-12>>2]^e[d-32>>2]^e[d-56>>2]^e[d-64>>2])<<1|(e[d-12>>2]^e[d-32>>2]^e[d-56>>2]^e[d-64>>2])>>>31;p=((f<<5|f>>>27)+(h^j^l)|0)+((q+n|0)-899497514|0)|0;n=l;l=j;j=h<<30|h>>>2;h=f;f=p;e[d>>2]=q}f=f+g|0;h=h+i|0;j=j+k|0;l=l+m|0;n=n+o|0}e[b+320>>2]=f;e[b+324>>2]=h;e[b+328>>2]=j;e[b+332>>2]=l;e[b+336>>2]=n}return{hash:f}};if(typeof module!=="undefined"){module.exports=b}else if(typeof window!=="undefined"){window.Rusha=b}if(typeof FileReaderSync!=="undefined"){var c=new FileReaderSync;var d=function a(b,c,d){try{return d(null,b.digest(c))}catch(a){return d(a)}};var e=function a(b,c,d,f,g){var h=new self.FileReader;h.onloadend=function a(){var i=h.result;c+=h.result.byteLength;try{b.append(i)}catch(a){g(a);return}if(c<f.size){e(b,c,d,f,g)}else{g(null,b.end())}};h.readAsArrayBuffer(f.slice(c,c+d))};self.onmessage=function a(c){var f=c.data.data,g=c.data.file,h=c.data.id;if(typeof h==="undefined")return;if(!g&&!f)return;var i=c.data.blockSize||4*1024*1024;var j=new b(i);j.resetState();var k=function a(b,c){if(!b){self.postMessage({id:h,hash:c})}else{self.postMessage({id:h,error:b.name})}};if(f)d(j,f,k);if(g)e(j,0,i,g,k)}}})();';

export class WorkerHasher implements Hasher {
  private workers: Array<HasherWorker> = [];
  private jobs: { [id: string]: Job } = {};
  private idCounter: number = 0;

  constructor(numOfWorkers: number) {
    for (let i = 0; i < numOfWorkers; ++i) {
      this.workers.push(this.createWorker());
    }
  }

  hash(piece: FilePiece): Promise<Chunk> {
    return new Promise((resolve, reject) => {
      const job: Job = { filePiece: piece, resolve, reject };
      this.calculateHashInWorker(job);
    });
  }

  private createWorker(): HasherWorker {
    const workerBlob = new Blob([rushaWorkerInline], { type: 'application/javascript' });
    const blobURL = URL.createObjectURL(workerBlob);

    const worker = new Worker(blobURL);
    const hasherWorker = { worker, activeJobs: 0 };

    worker.addEventListener('message', (event: MessageEvent) => {
      this.handleWorkerMessage(event, hasherWorker);
    });

    return hasherWorker;
  }

  private handleWorkerMessage(event: MessageEvent, hasherWorker: HasherWorker): void {
    const id = event.data.id;

    const job = this.jobs[id];
    if (job) {
      delete this.jobs[id];
      hasherWorker.activeJobs--;

      if (event.data.error) {
        this.calculateHashInWorker(job);
      } else {
        const chunk = new Chunk(job.filePiece, event.data.hash);
        job.resolve(chunk);
      }
    }
  }

  private calculateHashInWorker(job: Job): void {
    this.idCounter++;
    const jobId = `${this.idCounter}`;
    this.jobs[jobId] = job;

    const worker = this.getWorker();
    this.dispatch(jobId, worker, job.filePiece);
  }

  private dispatch(jobId: string, hasherWorker: HasherWorker, filePiece: FilePiece): void {
    hasherWorker.activeJobs++;
    const worker = hasherWorker.worker;

    const { file, startByte, endByte } = filePiece;
    const blob = file.slice(startByte, endByte);

    /*
     * postMessage() with chunk blob in Safari results in the error
     * "Failed to load resource: The operation couldn’t be completed. (WebKitBlobResource error 1.)"
     *
     * To prevent it, we read the data from the blob using FileReader and pass it via postMessage to the worker.
     */
    if (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1) {
      const rd = new FileReader();
      rd.onload = () => {
        worker.postMessage({ id: jobId, data: rd.result });
      };
      rd.readAsBinaryString(blob);
      return;
    }

    worker.postMessage({ id: jobId, data: blob });
  }

  private getWorker(): HasherWorker {
    // Pick the worker with least number of active jobs
    return this.workers.reduce((current, next) => {
      if (next.activeJobs < current.activeJobs) {
        return next;
      }

      return current;
    }, this.workers[0]);
  }
}
