// var dictionary = Dictionary.Dictionary.Instance;
// var dateTimeFormatter = DateTimeFormatter.DateTimeFormatter.Instance;

var Formatter = {
    dictionary: Dictionary.Dictionary.Instance,
    dateTimeFormatter: DateTimeFormatter.DateTimeFormatter.Instance,
    formatFreeSpins: function (freeSpinsCount) {
        return this.dictionary.getTextByKeyWithParam(Dictionary.TranslationKey.SAW_FREE_SPINS,
            this.dictionary.newParameters().setPatternKey(Dictionary.PatternKey.COUNT, freeSpinsCount));
    },
    formatExpirationDate: function (expDate) {
        return this.dictionary.getTextByKeyWithParam(Dictionary.TranslationKey.SAW_FREE_SPINS_EXPIRES_ON,
            this.dictionary.newParameters().setPatternKey(Dictionary.PatternKey.DATE, this.dateTimeFormatter.formatDate(expDate)));
    }
}