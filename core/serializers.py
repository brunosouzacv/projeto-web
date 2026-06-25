from rest_framework import serializers
from .models import UnidadeAcademica, Departamento, Curso, Aluno, Professor, TCC

class UnidadeAcademicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadeAcademica
        fields = '__all__'

class DepartamentoSerializer(serializers.ModelSerializer):
    unidade_academica_nome = serializers.CharField(source='unidade_academica.nome', read_only=True)

    class Meta:
        model = Departamento
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'

class AlunoSerializer(serializers.ModelSerializer):
    curso_nome = serializers.CharField(source='curso.nome', read_only=True)

    class Meta:
        model = Aluno
        fields = '__all__'

class ProfessorSerializer(serializers.ModelSerializer):
    departamento_nome = serializers.CharField(source='departamento.nome', read_only=True)

    class Meta:
        model = Professor
        fields = '__all__'

class TCCSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)
    idioma_display = serializers.CharField(source='get_idioma_display', read_only=True)
    aluno_nome = serializers.CharField(source='aluno.nome', read_only=True)
    orientador_nome = serializers.CharField(source='orientador.nome', read_only=True)

    class Meta:
        model = TCC
        fields = '__all__'
