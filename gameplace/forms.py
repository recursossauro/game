from django import forms

class WordIdForm(forms.Form):

    word_id = forms.IntegerField()
