<template>
  <div class="q-pa-md" style="width: 100vw; display: flex; justify-content: space-between;">
    <q-form @submit="onSearch" class="q-gutter-md" style="width: 50%; max-width: 600px;">
      <!-- Search Criteria -->
      <div class="text-h6">Search Criteria</div>
      <q-input filled v-model="searchName" label="Patient Name" />
      <q-input filled v-model="searchSurgery" label="Surgery" />
      <q-input filled type="number" v-model="searchAge" label="Age" />
      <q-input filled type="date" v-model="searchDate" label="Date of Admission" />

      <!-- Search Button -->
      <div>
        <q-btn label="Search" type="submit" color="primary" />
        <q-btn label="Clear" type="button" color="primary" flat class="q-ml-sm" @click="onClear" />
      </div>
    </q-form>

    <q-table
      style="width: 60%; max-width: 1500px;"
      :rows="searchResults"
      :columns="columns"
      row-key="id"
    />
  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { getApp } from 'firebase/app'

// Initialize Firestore
const db = getFirestore(getApp())

export default {
  data() {
    return {
      searchName: '',
      searchSurgery: '',
      searchAge: null,
      searchDate: '',
      searchResults: [],
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
  async onSearch() {
    const nameParts = this.searchName ? this.searchName.split(' ') : [];
    const searchQuery = query(
      collection(db, 'patients'),
      ...(nameParts.length ? [where('nameParts', 'array-contains-any', nameParts)] : []),
      ...(this.searchSurgery ? [where('surgery', '==', this.searchSurgery)] : []),
      ...(this.searchAge ? [where('age', '==', this.searchAge)] : []),
      ...(this.searchDate ? [where('doa', '==', this.searchDate)] : [])
    );

    const querySnapshot = await getDocs(searchQuery);
    this.searchResults = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  onClear() {
    this.searchName = '';
    this.searchSurgery = '';
    this.searchAge = null;
    this.searchDate = '';
    this.searchResults = [];
  }
}
}
</script>
