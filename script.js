const element = document.getElementById("myBtn");

element.addEventListener("click", myFunction);


async function myFunction() {



    document.getElementById("xyz").innerHTML = '沒有這條路線';

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






            let xxlam = data.data[x].orig_tc
            let yylam = data.data[x].dest_tc

              let xx = document.createElement("button");
              xx.classList.add("me");

              xx.innerText =   xxlam + "至" + yylam

          document.getElementById("xyz").appendChild(xx)

          xx.addEventListener("click", xFunction)






        } 

        if(data.data[x].bound === "I"){




                let xlam = data.data[x].orig_tc
                let ylam = data.data[x].dest_tc

                  let yy = document.createElement("button");
                  yy.classList.add("m");

                  yy.innerText =   xlam + "至" + ylam


              document.getElementById("xyz").appendChild(yy)

              yy.addEventListener("click", yFunction)





            }}








          async function xFunction(){

            document.getElementById("xxx").innerHTML = ""

            document.getElementById("yyy").innerHTML = ""

            let route = data.data[x].route

            let service_type = data.data[x].service_type

            let bound = "outbound"



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

            door.innerText = [parseInt(dicky)+1] + "." +  data3.data.name_tc

            document.getElementById("xxx").appendChild(door)

            door.addEventListener("click", zzFunction)

            async function zzFunction(){

                const api4 = `https://data.etabus.gov.hk/v1/transport/kmb/eta/${stop}/${route}/${service_type}`

                const res4 = await fetch(api4);

                const data4 = await res4.json();



                let xbutton = document.createElement("button");

                xbutton.classList.add("xbutton")

                xbutton.innerHTML = "X"









                for(j in data4.data){

                    if(data4.data[j].dir === "O"){



                    let doo = document.createElement("div");

                    doo.classList.add("d");




                    doo.innerText = [parseInt(j)+1] + "." + data3.data.name_tc +"\n" + data4.data[j].eta

            document.getElementById("yyy").appendChild(doo).appendChild(xbutton)


            xbutton.addEventListener("click",removefunction)

            function removefunction(){
                document.getElementById("yyy").removeChild(doo)
            }}}}






        }



    }

    async function yFunction(){

                document.getElementById("xxx").innerHTML = ""

                document.getElementById("yyy").innerHTML = ""

        let route = data.data[x].route

        let service_type = data.data[x].service_type

        let bound = "inbound"




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

            door.innerText = [parseInt(dicky)+1] + "." +  data3.data.name_tc

            document.getElementById("xxx").appendChild(door)

            door.addEventListener("click", zzFunction)

            async function zzFunction(){

                const api4 = `https://data.etabus.gov.hk/v1/transport/kmb/eta/${stop}/${route}/${service_type}`

                const res4 = await fetch(api4);

                const data4 = await res4.json();



                let xbutton = document.createElement("button");

                xbutton.classList.add("xbutton")

                xbutton.innerText = "X"


                for(j in data4.data){

                    if(data4.data[j].dir === "I"){



                    let doo = document.createElement("div");

                    doo.classList.add("d");




            doo.innerText = [parseInt(j)+1] + "." + data3.data.name_tc +"\n" + data4.data[j].eta
            document.getElementById("yyy").appendChild(doo).appendChild(xbutton)


            xbutton.addEventListener("click",removefunction)

            function removefunction(){
                document.getElementById("yyy").removeChild(doo)
            }}
        }}}}}}