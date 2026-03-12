// Base de datos de ejercicios (simplificada)
const ejercicios = {
    // Ejercicios de fuerza (bajas repeticiones, altos pesos)
    strength: {
        gym: {
            pecho: ['Press banca', 'Press inclinado con mancuernas', 'Aperturas'],
            espalda: ['Dominadas', 'Remo con barra', 'Jalón al pecho'],
            piernas: ['Sentadilla', 'Prensa', 'Peso muerto rumano'],
            hombros: ['Press militar', 'Elevaciones laterales', 'Pájaros'],
            brazos: ['Curl con barra', 'Press francés', 'Martillo']
        },
        home: {
            pecho: ['Flexiones diamante', 'Flexiones inclinadas', 'Flexiones declinadas'],
            espalda: ['Dominadas (si tienes barra)', 'Superman', 'Remo con mochila'],
            piernas: ['Sentadillas', 'Zancadas', 'Puente de glúteos'],
            hombros: ['Pike push-ups', 'Plancha con elevación', 'Círculos de brazos con peso'],
            brazos: ['Fondos en silla', 'Flexiones cerradas', 'Plancha inversa']
        }
    },
    // Ejercicios de volumen (8-12 repeticiones)
    hypertrophy: {
        gym: {
            pecho: ['Press banca', 'Press con mancuernas', 'Cruce de poleas'],
            espalda: ['Remo con mancuerna', 'Pull-over', 'Face pull'],
            piernas: ['Sentadilla', 'Extensiones', 'Curl femoral'],
            hombros: ['Press con mancuernas', 'Elevaciones frontales', 'Pájaros'],
            brazos: ['Curl alternado', 'Extensiones tras nuca', 'Concentrado']
        },
        home: {
            pecho: ['Flexiones', 'Flexiones abiertas', 'Flexiones con palmada'],
            espalda: ['Remo invertido en mesa', 'Y raises', 'T raises'],
            piernas: ['Sentadillas', 'Zancadas laterales', 'Sentadilla búlgara'],
            hombros: ['Pike push-ups', 'Elevaciones con botellas', 'Círculos'],
            brazos: ['Fondos', 'Flexiones diamante', 'Plancha']
        }
    },
    // Ejercicios de tonificación (altas repeticiones)
    tone: {
        gym: {
            pecho: ['Press en máquina', 'Peck deck', 'Aperturas en polea'],
            espalda: ['Remo en máquina', 'Pull-down', 'Pull-over'],
            piernas: ['Sentadilla goblet', 'Zancadas', 'Abducción'],
            hombros: ['Press en máquina', 'Elevaciones', 'Face pull'],
            brazos: ['Curl en polea', 'Extensiones', 'Cuerda']
        },
        home: {
            pecho: ['Flexiones', 'Flexiones con apoyo', 'Isométricos'],
            espalda: ['Y raises', 'T raises', 'Aperturas'],
            piernas: ['Sentadillas', 'Zancadas', 'Patada de glúteo'],
            hombros: ['Círculos', 'Elevaciones', 'Plancha con toque'],
            brazos: ['Fondos', 'Flexiones', 'Isométricos']
        }
    }
};

// Mapeo de días a estructura de rutina
const estructurasPorDia = {
    3: {
        nombre: 'Full Body',
        distribucion: ['Full Body A', 'Full Body B', 'Full Body C']
    },
    4: {
        nombre: 'Push/Pull/Legs + Full',
        distribucion: ['Push (Pecho, Hombros, Tríceps)', 'Pull (Espalda, Bíceps)', 'Piernas', 'Full Body']
    },
    5: {
        nombre: 'Weider split',
        distribucion: ['Pecho y Tríceps', 'Espalda y Bíceps', 'Piernas', 'Hombros y Trapecios', 'Full Body']
    }
};

// Función principal que genera la rutina
function generarRutina(objetivo, dias, lugar) {
    const ejerciciosObjetivo = ejercicios[objetivo][lugar];
    const estructura = estructurasPorDia[dias];
    const rutina = [];
    
    // Determinar series y repeticiones según objetivo
    let seriesReps;
    switch(objetivo) {
        case 'strength':
            seriesReps = '5 series x 5 repeticiones (85-90% RM)';
            break;
        case 'hypertrophy':
            seriesReps = '4 series x 8-12 repeticiones';
            break;
        case 'tone':
            seriesReps = '3 series x 15-20 repeticiones';
            break;
    }
    
    // Construir cada día de la rutina
    for(let i = 0; i < dias; i++) {
        const diaRutina = {
            nombre: estructura.distribucion[i],
            seriesReps: seriesReps,
            ejercicios: []
        };
        
        // Seleccionar ejercicios según el tipo de día
        if(estructura.distribucion[i].toLowerCase().includes('push') || 
           (estructura.distribucion[i].toLowerCase().includes('pecho'))) {
            diaRutina.ejercicios.push(
                ejerciciosObjetivo.pecho[0],
                ejerciciosObjetivo.hombros[0],
                ejerciciosObjetivo.brazos[1] // Tríceps
            );
        }
        else if(estructura.distribucion[i].toLowerCase().includes('pull') || 
                estructura.distribucion[i].toLowerCase().includes('espalda')) {
            diaRutina.ejercicios.push(
                ejerciciosObjetivo.espalda[0],
                ejerciciosObjetivo.espalda[1],
                ejerciciosObjetivo.brazos[0] // Bíceps
            );
        }
        else if(estructura.distribucion[i].toLowerCase().includes('pierna')) {
            diaRutina.ejercicios.push(
                ejerciciosObjetivo.piernas[0],
                ejerciciosObjetivo.piernas[1],
                ejerciciosObjetivo.piernas[2]
            );
        }
        else if(estructura.distribucion[i].toLowerCase().includes('hombro')) {
            diaRutina.ejercicios.push(
                ejerciciosObjetivo.hombros[0],
                ejerciciosObjetivo.hombros[1],
                ejerciciosObjetivo.hombros[2]
            );
        }
        else { // Full body - tomar uno de cada grupo
            diaRutina.ejercicios.push(
                ejerciciosObjetivo.pecho[0],
                ejerciciosObjetivo.espalda[0],
                ejerciciosObjetivo.piernas[0],
                ejerciciosObjetivo.hombros[0]
            );
        }
        
        rutina.push(diaRutina);
    }
    
    return rutina;
}

// Función para mostrar la rutina en el HTML
function mostrarRutina(rutina) {
    const display = document.getElementById('routine-display');
    display.innerHTML = '';
    
    rutina.forEach((dia, index) => {
        const diaDiv = document.createElement('div');
        diaDiv.classList.add('dia-rutina');
        diaDiv.style.marginBottom = '25px';
        
        const titulo = document.createElement('h3');
        titulo.textContent = `📅 Día ${index + 1}: ${dia.nombre}`;
        titulo.style.color = '#764ba2';
        
        const reps = document.createElement('p');
        reps.textContent = `📊 ${dia.seriesReps}`;
        reps.style.fontStyle = 'italic';
        reps.style.marginBottom = '10px';
        
        const lista = document.createElement('ul');
        dia.ejercicios.forEach(ej => {
            const item = document.createElement('li');
            item.textContent = ej;
            lista.appendChild(item);
        });
        
        diaDiv.appendChild(titulo);
        diaDiv.appendChild(reps);
        diaDiv.appendChild(lista);
        display.appendChild(diaDiv);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('routine-form');
    const resultContainer = document.getElementById('result-container');
    const btnNewRoutine = document.getElementById('btn-new-routine');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const objetivo = document.getElementById('goal').value;
        const dias = parseInt(document.getElementById('days').value);
        const lugar = document.getElementById('location').value;
        
        // Validación básica
        if (!objetivo || !dias || !lugar) {
            alert('Por favor, completa todas las opciones');
            return;
        }
        
        // Generar rutina
        const rutinaGenerada = generarRutina(objetivo, dias, lugar);
        
        // Mostrar resultados
        mostrarRutina(rutinaGenerada);
        form.classList.add('hidden');
        resultContainer.classList.remove('hidden');
    });
    
    btnNewRoutine.addEventListener('click', () => {
        // Resetear formulario
        form.reset();
        form.classList.remove('hidden');
        resultContainer.classList.add('hidden');
    });
});