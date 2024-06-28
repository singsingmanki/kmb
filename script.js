const element = document.getElementById("myBtn");

element.addEventListener("click", myFunction);

async function myFunction() {

    document.getElementById("xyz").textContent = '沒有這條路線';

    document.getElementById("xxx").innerHTML = ""

    document.getElementById("yyy").innerHTML = ""

    const api = `https://data.etabus.gov.hk/v1/transport/kmb/route/`
    const res = await fetch(api);
    const data = await res.json();

    let name1 = document.getElementById("lname").value.toUpperCase();

    for(let x in data.data){

        if(data.data[x].route === name1){

        if(data.data[x].bound === "O"){

            document.getElementById("xyz").innerHTML = '請選擇路線：';
        }

            let xxlam = data.data[x].orig_tc
            let yylam = data.data[x].dest_tc

              let xx = document.createElement("button");
              xx.classList.add("me");

              xx.innerText =   xxlam + "至" + yylam

          document.getElementById("xyz").appendChild(xx)

          xx.addEventListener("click", xFunction)
       
        } 


          async function xFunction(){

            if(data.data[x].bound === "I"){
                bound = "inbound"}

                if(data.data[x].bound === "O"){
                    bound = "outbound"}

            document.getElementById("xxx").innerHTML = ""

            document.getElementById("yyy").innerHTML = ""

            let route = data.data[x].route

            let service_type = data.data[x].service_type


            const api2 = `https://data.etabus.gov.hk/v1/transport/kmb/route-stop/${route}/${bound}/${service_type}`
            const res2 = await fetch(api2);

           const data2 = await res2.json();

           for(let dicky in data2.data){

            let gg = document.createElement("button");
            gg.classList.add("m");

        let stop = data2.data[dicky].stop
        
            const api3 = `https://data.etabus.gov.hk/v1/transport/kmb/stop/${stop}`

            const res3 = await fetch(api3);

            const data3 = await res3.json();

            let door = document.createElement("button");
            door.classList.add("d");

            door.innerText = [parseInt(dicky)+1] + ") " +  data3.data.name_tc

            document.getElementById("xxx").appendChild(door)

            door.addEventListener("click", zzFunction)


            async function zzFunction(){

                const api4 = `https://data.etabus.gov.hk/v1/transport/kmb/eta/${stop}/${route}/${service_type}`

                const res4 = await fetch(api4);

                const data4 = await res4.json();

                let xbutton = document.createElement("div");

                xbutton.classList.add("xbutton")

                xbutton.innerHTML = "X"

                let zbutton = document.createElement("div");

                zbutton.classList.add("zbutton")

                zbutton.innerHTML = "預期到達時間" 

                document.getElementById("yyy").appendChild(zbutton).appendChild(xbutton)

                xbutton.addEventListener("click",removefunction)

                function removefunction(){

                    document.getElementById("yyy").removeChild(zbutton)
                }

                for(j in data4.data){

                    console.log(data4.data[j].seq)

                    if(data4.data[j].seq == data2.data[dicky].seq){

                    let doo = document.createElement("div");

                    doo.classList.add("e");

                    if(data4.data[j].rmk_tc == ""){
                        data4.data[j].rmk_tc = "實時班次"

                    }

                    let cd = j
                    if(cd>=3){
                        cd=cd-3}

                        let nogg = new Date();
                        noggg = parseInt(nogg.toString().slice(19,21))
                        
                        let ggg = data4.data[j].eta
                        gggg= ggg.toString().slice(11,19)
                        ggggg = parseInt(ggg.toString().slice(14,16))

                        if(ggggg>noggg){
                            ccd = ggggg-noggg
                            
                            } else{
                            ccd = noggg-ggggg
                            }

                        if(ggggg ==0){
                            ccd = ggggg + 60 -noggg
                        }
    
                        doo.innerText = [parseInt(cd)+1] + ") " + data3.data.name_tc +"\n" + gggg +"\n"+ ccd +
                        " 分鐘後到達"
                        +"\n"  + `(${data4.data[j].rmk_tc})`  +"\n" +"\n" 

            document.getElementById("yyy").appendChild(doo).appendChild(xbutton)


            xbutton.addEventListener("click",removefunction)

            function removefunction(){
                document.getElementById("yyy").removeChild(doo)
    
            }}}}
        }
    }
   
    }}
