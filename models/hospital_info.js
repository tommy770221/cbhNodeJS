/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hospital_info', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    hp_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hp_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hp_auth: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hp_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone_no: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    medical_treatment_section: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    western_doctor: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    chinese_medicine_practitioners: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dentist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pharmacist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pharmacy_health: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nursing_division: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nurse: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    midwife: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    midwife_asist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    medical_examiner: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    medical_examiner_asist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    physical_therapist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    functional_therapist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    medical_radiologist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    medical_literati: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    physical_therapy: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    respiratory_therapist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    functional_therapy: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    consult_a_psychologist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    clinical_psychologist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nutritionist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    language_therapist: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dental_technician: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    listener: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dental_technician_asist: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'hospital_info'
  });
};
