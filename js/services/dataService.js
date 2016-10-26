app.service("dataService", function() {
        this.changes = [];
        this.getData = function() {
            return [{
                isImaged: false,
                imageUrl: null,
                background: '#fff',
                colorChangerActive: false,
                name: "Вы не добавили ни одной заметки",
                content: "Чтобы сделать это, нажмите на поле в шапке сайта. Приятного использования!"
                //id: 0
            }];
        }
        this.pushData = function(note) {
            this.changes.push({
                name: note.name,
                content: note.content
            });
        }
        this.updateData = function() {
            /*localStorage.setItem("ksNotes", this.changes);*/
        }
});
