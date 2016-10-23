app.service("dataService", function($localForage) {
        this.changes = [];
        this.getData = function() {
            if($localForage.length() > 0)
                return $localForage.getItem("ksNotes");
            else return [{
                name: "Вы не добавили ни одной заметки",
                content: "Чтобы сделать это, нажмите на поле в шапке сайта. Приятного использования!"
            }];
        }
        this.pushData = function(note) {
            this.changes.push({
                name: note.name,
                content: note.content
            });
        }
        this.updateData = function() {
            localStorage.setItem("ksNotes", this.changes);
        }
});
