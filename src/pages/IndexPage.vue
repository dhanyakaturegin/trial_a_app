<template>
  <div class="q-pa-md" style="width: 100vw; display: flex; justify-content: space-between;">

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" style="width: 50%; max-width: 600px;">

      <!-- Personal Information -->
      <div class="text-h6">Personal Information</div>
      <q-input
        filled
        v-model="name"
        label="Patient Name *"
        :rules="[val => val && val.length > 0 || 'Name is required']"
      />

      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-input
            filled
            type="date"
            v-model="dob"
            label="Date of Birth *"
            :rules="[val => val && val.length > 0 || 'DOB is required']"
          />
        </div>
        <div class="col-6">
          <q-input
            filled
            type="number"
            v-model="age"
            label="Age"
            readonly
          />
        </div>
      </div>

      <q-select
        filled
        v-model="maritalStatus"
        :options="['Single', 'Married', 'Divorced', 'Widowed']"
        label="Marital Status"
      />

      <q-input
        filled
        type="number"
        v-model="children"
        label="Number of Children"
      />

      <!-- Hospital Details -->
      <div class="text-h6">Hospital Details</div>
      <q-input
        filled
        type="date"
        v-model="doa"
        label="Date of Admission *"
      />

      <q-input
        filled
        type="date"
        v-model="dod"
        label="Date of Discharge"
      />

      <q-input
        filled
        v-model="hospital"
        label="Hospital *"
      />

      <!-- Surgery Information -->
      <div class="text-h6">Surgery Information</div>
      <q-input
        filled
        v-model="surgery"
        label="Surgery *"
      />

      <q-input
        filled
        type="textarea"
        v-model="preDiagnosis"
        label="Pre-Surgery Diagnosis"
      />

      <q-input
        filled
        type="textarea"
        v-model="postDiagnosis"
        label="Post-Surgery Diagnosis"
      />

      <q-input
        filled
        type="textarea"
        v-model="histology"
        label="Histology"
      />

      <!-- Medical Details -->
      <div class="text-h6">Medical Details</div>
      <q-input
        filled
        type="textarea"
        v-model="comorbidities"
        label="Comorbidities"
      />

      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <q-input
            filled
            type="number"
            step="0.1"
            v-model="preOpHb"
            label="Pre-op HB"
          />
        </div>
        <div class="col-6">
          <q-input
            filled
            type="number"
            step="0.1"
            v-model="postOpHb"
            label="Post-op HB"
          />
        </div>
      </div>

      <q-input
        filled
        type="time"
        v-model="surgeryTime"
        label="Surgery Time"
      />

      <q-input
        filled
        type="textarea"
        v-model="complications"
        label="Post-op Complications"
      />

      <q-input
        filled
        type="textarea"
        v-model="specialNotes"
        label="Special Notes"
      />

      <q-toggle
        v-model="readmission"
        label="Readmission Required"
      />

      <!-- Photo Upload -->
      <q-file
        filled
        v-model="photo"
        label="Upload Photo"
        accept="image/*"
      >
        <template v-slot:append>
          <q-icon name="attach_file" />
        </template>
      </q-file>

      <q-input
        filled
        type="textarea"
        v-model="otherMatters"
        label="Any Other Matters"
      />

      <!-- Form Actions -->
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

    <q-table

      style="width: 60%; max-width: 1500px;"

      :rows="patients"
      :columns="columns"
      row-key="id"


    />

</div>

</template>

<script>
import { addDoc, updateDoc, doc, collection, getFirestore, getDocs } from 'firebase/firestore'
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
      ]

    }
  },
  methods: {



    onReset() {
      // Reset all form fields
      Object.keys(this.$data).forEach(key => {
        this[key] = this.$options.data()[key]
      })
    },
    async saveToFirebase(data) {
    try {
      const nameParts = data.name.split(' ');
      data.nameParts = nameParts;
      if (!this.formId) {
        const docRef = await addDoc(collection(db, 'patients'), data);
        this.formId = docRef.id;
        console.log('New document created with ID:', this.formId);
      } else {
        await updateDoc(doc(db, 'patients', this.formId), data);
        console.log('Document updated:', this.formId, data);
      }
    } catch (error) {
      console.error('Error saving to Firebase:', error);
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
        updatedAt: new Date().toISOString()
      }

      await this.saveToFirebase(formData)
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
    }
  },
  async mounted() {
    // Fetch all patients from Firestore
    const querySnapshot = await getDocs(collection(db, 'patients'))
    querySnapshot.forEach(doc => {
      this.patients.push({ id: doc.id, ...doc.data() })
    })
  }
}
</script>


