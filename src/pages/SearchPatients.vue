<template>
  <div class="q-pa-md" style="max-width: 800px">
    <q-table
      :rows="patients"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 10, 20, 50]"
      :filter="filter"
    >
      <template v-slot:top>
        <q-input
          round
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search..."
          class="q-ma-sm"
        />
      </template>
      <template v-slot:body-cell="{ row, col }">
        <q-td :props="col">
          {{ row[col.field] }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebaseConfig' // Adjust the path as necessary

export default {
  setup() {
    const patients = ref([])
    const columns = [
      { name: 'name', label: 'Name', field: 'name', sortable: true },
      { name: 'dob', label: 'DOB', field: 'dob', sortable: true },
      { name: 'age', label: 'Age', field: 'age', sortable: true },
      { name: 'maritalStatus', label: 'Marital Status', field: 'maritalStatus', sortable: true },
      { name: 'children', label: 'No of Children', field: 'children', sortable: true },
      { name: 'doa', label: 'DOA', field: 'doa', sortable: true },
      { name: 'dod', label: 'DOD', field: 'dod', sortable: true },
      { name: 'hospital', label: 'Hospital', field: 'hospital', sortable: true },
      { name: 'surgery', label: 'Surgery', field: 'surgery', sortable: true },
      { name: 'preDiagnosis', label: 'Pre Surgery Diagnosis', field: 'preDiagnosis', sortable: true },
      { name: 'postDiagnosis', label: 'Post Surgery Diagnosis', field: 'postDiagnosis', sortable: true },
      { name: 'histology', label: 'Histology', field: 'histology', sortable: true },
      { name: 'comorbidities', label: 'Comorbidities', field: 'comorbidities', sortable: true },
      { name: 'preOpHb', label: 'Pre Op HB', field: 'preOpHb', sortable: true },
      { name: 'postOpHb', label: 'Post Op HB', field: 'postOpHb', sortable: true },
      { name: 'surgeryTime', label: 'Surgery Time', field: 'surgeryTime', sortable: true },
      { name: 'complications', label: 'Post Op Complications', field: 'complications', sortable: true },
      { name: 'specialNotes', label: 'Special Notes', field: 'specialNotes', sortable: true },
      { name: 'readmission', label: 'Readmission', field: 'readmission', sortable: true },
      { name: 'photo', label: 'Photo', field: 'photo', sortable: true },
      { name: 'otherMatters', label: 'Any Other Matters', field: 'otherMatters', sortable: true }
    ]

    const pagination = ref({ page: 1, rowsPerPage: 10 })
    const filter = ref('')

    const fetchPatients = () => {
      onSnapshot(collection(db, 'patients'), (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        console.log('Fetched patients:', data) // Log the fetched data
        patients.value = data
      })
    }

    onMounted(() => {
      fetchPatients()
    })

    return {
      patients,
      columns,
      pagination,
      filter
    }
  }
}
</script>
