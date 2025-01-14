<template>
  <div>
    <q-table
      class="word-wrap-table"
      style="width: auto"
      :rows="patients"
      :columns="columns"
      row-key="id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat icon="edit_note" @click="editRow(props.row)" />
          <q-btn flat icon="delete" color="negative" @click="deletePatient(props.row.id)" />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="isDialogOpen">
      <q-card>
        <!-- Add your content here -->

        <q-card-section>
          <div class="text-h6">Edit Patient</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="editedPatient.name" label="Name" />
          <q-input v-model="editedPatient.dob" label="Date of Birth" type="date" />
          <q-input v-model="editedPatient.age" label="Age" type="number" />
          <q-input v-model="editedPatient.maritalStatus" label="Marital Status" />
          <q-input v-model="editedPatient.children" label="Children" type="number" />
          <q-input v-model="editedPatient.doa" label="Date of Admission" type="date" />
          <q-input v-model="editedPatient.dod" label="Date of Discharge" type="date" />
          <q-input v-model="editedPatient.hospital" label="Hospital" />
          <q-input v-model="editedPatient.surgery" label="Surgery" />
          <q-input v-model="editedPatient.preDiagnosis" label="Pre-Surgery Diagnosis" />
          <q-input v-model="editedPatient.postDiagnosis" label="Post-Surgery Diagnosis" />
          <q-input v-model="editedPatient.histology" label="Histology" />
          <q-input v-model="editedPatient.comorbidities" label="Comorbidities" />
          <q-input v-model="editedPatient.preOpHb" label="Pre-op HB" type="number" />
          <q-input v-model="editedPatient.postOpHb" label="Post-op HB" type="number" />
          <q-input v-model="editedPatient.surgeryTime" label="Surgery Time" type="time" />
          <q-input v-model="editedPatient.complications" label="Post-op Complications" />
          <q-input v-model="editedPatient.specialNotes" label="Special Notes" />
          <q-toggle v-model="editedPatient.readmission" label="Readmission Required" />
          <q-input v-model="editedPatient.otherMatters" label="Other Matters" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Save" color="primary" @click="saveEdit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { addDoc, updateDoc, deleteDoc, doc, collection, getFirestore, getDocs, onSnapshot } from 'firebase/firestore'
import { getApp } from 'firebase/app'

// Initialize Firestore
const db = getFirestore(getApp())

export default {
  data() {
    return {
      name: '',
      dob: '',
      age: '',
      maritalStatus: null,
      children: 0,
      doa: '',
      dod: '',
      hospital: '',
      surgery: '',
      preDiagnosis: '',
      postDiagnosis: '',
      histology: '',
      comorbidities: '',
      preOpHb: null,
      postOpHb: null,
      surgeryTime: '',
      complications: '',
      specialNotes: '',
      readmission: false,
      photo: null,
      otherMatters: '',
      formId: null,
      patients: [],
      columns: [
        {
          name: 'name',
          label: 'Name',
          field: 'name',
          style: 'max-width: 150px; height: auto; white-space: normal; text-align: left;',
        },
        {
          name: 'dob',
          label: 'Date of Birth',
          field: 'dob',
          style: 'max-width: 150px; white-space: normal; text-align: left;',
        },
        {
          name: 'age',
          label: 'Age',
          field: 'age',
          style: 'max-width: 100px; white-space: normal; text-align: left;',
        },
        {
          name: 'maritalStatus',
          label: 'Marital Status',
          field: 'maritalStatus',
          style: 'max-width: 150px; white-space: normal; text-align: left;',
        },
        {
          name: 'children',
          label: 'Children',
          field: 'children',
          style: 'max-width: 100px; white-space: normal; text-align: left;',
        },
        {
          name: 'doa',
          label: 'Date of Admission',
          field: 'doa',
          style: 'max-width: 150px; white-space: normal; text-align: left;',
        },
        {
          name: 'dod',
          label: 'Date of Discharge',
          field: 'dod',
          style: 'max-width: 150px; white-space: normal; text-align: left;',
        },
        {
          name: 'hospital',
          label: 'Hospital',
          field: 'hospital',
          style: 'max-width: 150px; white-space: normal; text-align: left;',
        },
        {
          name: 'surgery',
          label: 'Surgery',
          field: 'surgery',
          style: 'max-width: 150px; white-space: normal; text-align: left;',
        },
        {
          name: 'preDiagnosis',
          label: 'Pre-Surgery Diagnosis',
          field: 'preDiagnosis',
          style: 'max-width: 200px; height: auto; white-space: normal; text-align: left;',
        },
        {
          name: 'postDiagnosis',
          label: 'Post-Surgery Diagnosis',
          field: 'postDiagnosis',
          style: 'max-width: 200px; white-space: normal; text-align: left;',
        },
        {
          name: 'histology',
          label: 'Histology',
          field: 'histology',
          style: 'max-width: 150px; height: auto; white-space: normal; text-align: left;',
        },
        {
          name: 'comorbidities',
          label: 'Comorbidities',
          field: 'comorbidities',
          style: 'max-width: 200px; white-space: normal; text-align: left;',
        },
        {
          name: 'preOpHb',
          label: 'Pre-op HB',
          field: 'preOpHb',
          style: 'max-width: 100px; white-space: normal; text-align: left;',
        },
        {
          name: 'postOpHb',
          label: 'Post-op HB',
          field: 'postOpHb',
          style: 'max-width: 100px; white-space: normal; text-align: left;',
        },
        {
          name: 'surgeryTime',
          label: 'Surgery Time',
          field: 'surgeryTime',
          style: 'max-width: 150px; white-space: normal; text-align: left;',
        },
        {
          name: 'complications',
          label: 'Post-op Complications',
          field: 'complications',
          style: 'max-width: 200px; white-space: normal; text-align: left;',
        },
        {
          name: 'specialNotes',
          label: 'Special Notes',
          field: 'specialNotes',
          style: 'max-width: 200px; white-space: normal; text-align: left;',
        },
        {
          name: 'readmission',
          label: 'Readmission Required',
          field: 'readmission',
          style: 'max-width: 150px; white-space: normal; text-align: left;',
        },
        {
          name: 'otherMatters',
          label: 'Other Matters',
          field: 'otherMatters',
          style: 'max-width: 200px; white-space: normal; text-align: left;',
        },
        { name: 'actions', label: 'Actions', field: 'actions', style: 'text-align: left;' },
      ],
      isDialogOpen: false,
      editedPatient: {},
    }
  },
  methods: {
    onReset() {
      // Reset all form fields
      Object.keys(this.$data).forEach((key) => {
        this[key] = this.$options.data()[key]
      })
    },
    async saveToFirebase(data) {
      try {
        if (!this.formId) {
          const docRef = await addDoc(collection(db, 'patients'), data)
          this.formId = docRef.id
          console.log('New document created with ID:', this.formId)
        } else {
          await updateDoc(doc(db, 'patients', this.formId), data)
          console.log('Document updated:', this.formId, data)
        }
      } catch (error) {
        console.error('Error saving to Firebase:', error)
      }
    },

    // Modify your existing methods
    async onSubmit() {
      const formData = {
        name: this.name,
        dob: this.dob,
        age: this.age,
        maritalStatus: this.maritalStatus,
        children: this.children,
        doa: this.doa,
        dod: this.dod,
        hospital: this.hospital,
        surgery: this.surgery,
        preDiagnosis: this.preDiagnosis,
        postDiagnosis: this.postDiagnosis,
        histology: this.histology,
        comorbidities: this.comorbidities,
        preOpHb: this.preOpHb,
        postOpHb: this.postOpHb,
        surgeryTime: this.surgeryTime,
        complications: this.complications,
        specialNotes: this.specialNotes,
        readmission: this.readmission,
        otherMatters: this.otherMatters,
        updatedAt: new Date().toISOString(),
      }

      await this.saveToFirebase(formData)
    },
    async fetchPatients() {
      const patientsCollection = collection(db, 'patients')
      onSnapshot(patientsCollection, (querySnapshot) => {
        this.patients = [] // Clear the array before updating
        querySnapshot.forEach((doc) => {
          this.patients.push({ id: doc.id, ...doc.data() })
        })
      })
},
    editRow(row) {
      this.editedPatient = { ...row }
      this.isDialogOpen = true
    },
    async saveEdit() {
      try {
        await updateDoc(doc(db, 'patients', this.editedPatient.id), this.editedPatient)
        const index = this.patients.findIndex((patient) => patient.id === this.editedPatient.id)
        if (index !== -1) {
          this.patients.splice(index, 1, this.editedPatient)
        }
        this.isDialogOpen = false
      } catch (error) {
        console.error('Error updating document:', error)
      }
    },
    async deletePatient(id) {
      try {
        await deleteDoc(doc(db, 'patients', id))
        this.patients = this.patients.filter(patient => patient.id !== id)
        console.log('Document deleted with ID:', id)
      } catch (error) {
        console.error('Error deleting document:', error)
      }
    }
  },

  watch: {
    dob(newVal) {
      if (newVal) {
        const birthDate = new Date(newVal)
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }
        this.age = age
      }
      if (this.formId) this.saveToFirebase({ dob: newVal, age: this.age })
    },
    name(newVal) {
      if (this.formId) this.saveToFirebase({ name: newVal })
    },
    maritalStatus(newVal) {
      if (this.formId) this.saveToFirebase({ maritalStatus: newVal })
    },
    children(newVal) {
      if (this.formId) this.saveToFirebase({ children: newVal })
    },
    doa(newVal) {
      if (this.formId) this.saveToFirebase({ doa: newVal })
    },
    dod(newVal) {
      if (this.formId) this.saveToFirebase({ dod: newVal })
    },
    hospital(newVal) {
      if (this.formId) this.saveToFirebase({ hospital: newVal })
    },
    surgery(newVal) {
      if (this.formId) this.saveToFirebase({ surgery: newVal })
    },
    preDiagnosis(newVal) {
      if (this.formId) this.saveToFirebase({ preDiagnosis: newVal })
    },
    postDiagnosis(newVal) {
      if (this.formId) this.saveToFirebase({ postDiagnosis: newVal })
    },
    histology(newVal) {
      if (this.formId) this.saveToFirebase({ histology: newVal })
    },
    comorbidities(newVal) {
      if (this.formId) this.saveToFirebase({ comorbidities: newVal })
    },
    preOpHb(newVal) {
      if (this.formId) this.saveToFirebase({ preOpHb: newVal })
    },
    postOpHb(newVal) {
      if (this.formId) this.saveToFirebase({ postOpHb: newVal })
    },
    surgeryTime(newVal) {
      if (this.formId) this.saveToFirebase({ surgeryTime: newVal })
    },
    complications(newVal) {
      if (this.formId) this.saveToFirebase({ complications: newVal })
    },
    specialNotes(newVal) {
      if (this.formId) this.saveToFirebase({ specialNotes: newVal })
    },
    readmission(newVal) {
      if (this.formId) this.saveToFirebase({ readmission: newVal })
    },
    otherMatters(newVal) {
      if (this.formId) this.saveToFirebase({ otherMatters: newVal })
    },
  },
  async mounted() {
    // Fetch all patients from Firestore
    const querySnapshot = await getDocs(collection(db, 'patients'))
    querySnapshot.forEach((doc) => {
      this.patients.push({ id: doc.id, ...doc.data() })
    })
  },
}
</script>
