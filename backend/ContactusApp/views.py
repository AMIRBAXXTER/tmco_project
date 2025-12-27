from rest_framework import viewsets
from .models import Suggestion
from .serializers import SuggestionSerializer
from .tasks import send_suggestion_email

SUBJECT_LABELS = dict(Suggestion.subjects)


class SuggestionViewSet(viewsets.ModelViewSet):
    queryset = Suggestion.objects.all()
    serializer_class = SuggestionSerializer

    def perform_create(self, serializer):
        suggestion = serializer.save()

        email_data = {
            "full_name": suggestion.full_name,
            "email": suggestion.email,
            "phone_number": suggestion.phone_number,
            "subject": suggestion.subject,
            "subject_label": SUBJECT_LABELS.get(suggestion.subject),
            "message": suggestion.message,
        }

        send_suggestion_email.delay(email_data)
