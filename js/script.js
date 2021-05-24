// Milestone 1:
// Replica della grafica (immagine in allegato) con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse;
// Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto, ricavandoli dall'array contacts qui allegato
// Milestone 2
// Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all'interno del pannello della conversazione
// Click sul contatto mostra la conversazione del contatto cliccato
// Milestone 3
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
// Milestone 4
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

var app = new Vue ({
    el: "#root", 
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },     
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        activeIndex: 0,
        newMessage : "",
        currentDate: "",
        randomAnswers: ["Ok","Va bene","Ricevuto", "👍👍"],
        searchInput: "",
        hideEmoticon: true
    },
    created : function () {
        var d = new Date();
        this.currentDate = dayjs().format('DD/MM/YYYY HH:mm:ss');
    },
    methods: {
        getImage: function (index) {
            let img = "img/avatar";
            return img + this.contacts[index].avatar + ".jpg";
        },
        getLastMessage: function(index) {
            let lastMessage = index.messages[index.messages.length - 1].text;

            if (lastMessage.length >= 30) {
                lastMessage = lastMessage.slice(0,30) + " ...";
            }
            return lastMessage;
        },
        setActive: function(index) {
            this.activeIndex = index;
        },
        getLastAccess: function (contact) {
            // Array di messaggi della chat
            const messages = contact.messages;
            const lastMessageIndex = messages.length-1;
            const lastMessage = messages[lastMessageIndex];
            // Data dell'ultimo messaggio
            return lastMessage.date;
        },
        sendMessage: function (contact) {
           contact.messages.push({
               date: this.currentDate,
               text: this.newMessage,
               status: 'sent'
           });
           setTimeout ( () => {
            const random = Math.floor((Math.random() * this.randomAnswers.length));
            const randomAnswer = this.randomAnswers[random];
            contact.messages.push ({
            date: this.currentDate,
            text: randomAnswer,
            status: 'received'
            })
           }, 1000);
           this.newMessage = "";
        },
        filterItem: function (input) {
        var input = input.charAt(0).toUpperCase() + input.slice(1);
            for (i = 0; i < this.contacts.length; i++) {
                let element = this.contacts[i];
                if (element.name.startsWith(input)) {
                   element.visible = true;
                } else if (input == "") {
                    element.visible = true;
                } else {
                   element.visible = false;
                }
            }
            
        },
        toggleEmoticon: function () {
            this.hideEmoticon = !this.hideEmoticon;
        }
    }
}
)


